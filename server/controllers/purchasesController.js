const pool = require('../db/connection');

exports.list = async (req, res, next) => {
  try {
    const [rows] = await pool.execute(
      'SELECT p.*, s.name AS supplier_name, u.name AS created_by_name FROM purchases p LEFT JOIN suppliers s ON p.supplier_id=s.id LEFT JOIN users u ON p.created_by=u.id ORDER BY p.purchase_date DESC, p.id DESC'
    );
    res.json(rows);
  } catch (err) { next(err); }
};

exports.get = async (req, res, next) => {
  try {
    const [purch] = await pool.execute(
      'SELECT p.*, s.name AS supplier_name FROM purchases p LEFT JOIN suppliers s ON p.supplier_id=s.id WHERE p.id=?',
      [req.params.id]
    );
    if (!purch.length) return res.status(404).json({ error: 'Purchase not found' });
    const [items] = await pool.execute(
      'SELECT pi.*, pr.name AS product_name, pr.sku FROM purchase_items pi JOIN products pr ON pi.product_id=pr.id WHERE pi.purchase_id=?',
      [req.params.id]
    );
    res.json({ ...purch[0], items });
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const { supplier_id, items, purchase_date } = req.body;
    if (!items || !items.length) return res.status(400).json({ error: 'No items provided' });

    let totalCost = 0;
    for (const item of items) totalCost += item.qty * item.unit_cost;

    const poNo = 'PO-' + Date.now();
    const [pResult] = await conn.execute(
      'INSERT INTO purchases (po_no,supplier_id,total_cost,purchase_date,created_by) VALUES (?,?,?,?,?)',
      [poNo, supplier_id||null, totalCost, purchase_date||new Date().toISOString().slice(0,10), req.user.id]
    );
    const purchId = pResult.insertId;

    for (const item of items) {
      await conn.execute(
        'INSERT INTO purchase_items (purchase_id,product_id,qty,unit_cost) VALUES (?,?,?,?)',
        [purchId, item.product_id, item.qty, item.unit_cost]
      );
      await conn.execute('UPDATE products SET qty = qty + ? WHERE id=?', [item.qty, item.product_id]);
    }

    await conn.commit();
    res.status(201).json({ id: purchId, po_no: poNo, total_cost: totalCost });
  } catch (err) {
    await conn.rollback();
    next(err);
  } finally {
    conn.release();
  }
};

exports.remove = async (req, res, next) => {
  try {
    await pool.execute('DELETE FROM purchases WHERE id=?', [req.params.id]);
    res.json({ message: 'Purchase deleted' });
  } catch (err) { next(err); }
};

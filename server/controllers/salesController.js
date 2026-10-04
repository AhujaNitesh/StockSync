const pool = require('../db/connection');

exports.list = async (req, res, next) => {
  try {
    const [rows] = await pool.execute(
      'SELECT s.*, u.name AS cashier_name FROM sales s LEFT JOIN users u ON s.cashier_id=u.id ORDER BY s.sale_date DESC, s.id DESC'
    );
    res.json(rows);
  } catch (err) { next(err); }
};

exports.get = async (req, res, next) => {
  try {
    const [sale] = await pool.execute(
      'SELECT s.*, u.name AS cashier_name FROM sales s LEFT JOIN users u ON s.cashier_id=u.id WHERE s.id=?',
      [req.params.id]
    );
    if (!sale.length) return res.status(404).json({ error: 'Sale not found' });
    const [items] = await pool.execute(
      'SELECT si.*, p.name AS product_name, p.sku FROM sale_items si JOIN products p ON si.product_id=p.id WHERE si.sale_id=?',
      [req.params.id]
    );
    res.json({ ...sale[0], items });
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const { customer_name, items, discount, payment_mode, sale_date } = req.body;
    if (!items || !items.length) return res.status(400).json({ error: 'No items provided' });

    let total = 0;
    for (const item of items) total += item.qty * item.unit_price;
    total = parseFloat((total - (discount || 0)).toFixed(2));

    const billNo = 'BILL-' + Date.now();
    const [saleResult] = await conn.execute(
      'INSERT INTO sales (bill_no,customer_name,cashier_id,total_amount,discount,payment_mode,sale_date) VALUES (?,?,?,?,?,?,?)',
      [billNo, customer_name||'Walk-in Customer', req.user.id, total, discount||0, payment_mode||'cash', sale_date||new Date().toISOString().slice(0,10)]
    );
    const saleId = saleResult.insertId;

    for (const item of items) {
      await conn.execute(
        'INSERT INTO sale_items (sale_id,product_id,qty,unit_price) VALUES (?,?,?,?)',
        [saleId, item.product_id, item.qty, item.unit_price]
      );
      await conn.execute('UPDATE products SET qty = qty - ? WHERE id=?', [item.qty, item.product_id]);
    }

    await conn.commit();
    res.status(201).json({ id: saleId, bill_no: billNo, total_amount: total });
  } catch (err) {
    await conn.rollback();
    next(err);
  } finally {
    conn.release();
  }
};

exports.remove = async (req, res, next) => {
  try {
    await pool.execute('DELETE FROM sales WHERE id=?', [req.params.id]);
    res.json({ message: 'Sale deleted' });
  } catch (err) { next(err); }
};

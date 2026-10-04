const pool = require('../db/connection');

exports.list = async (req, res, next) => {
  try {
    const [rows] = await pool.execute(`
      SELECT p.*, c.name AS category_name, s.name AS supplier_name
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN suppliers  s ON p.supplier_id  = s.id
      ORDER BY p.name
    `);
    res.json(rows);
  } catch (err) { next(err); }
};

exports.get = async (req, res, next) => {
  try {
    const [rows] = await pool.execute(
      'SELECT p.*, c.name AS category_name, s.name AS supplier_name FROM products p LEFT JOIN categories c ON p.category_id=c.id LEFT JOIN suppliers s ON p.supplier_id=s.id WHERE p.id=?',
      [req.params.id]
    );
    if (!rows.length) return res.status(404).json({ error: 'Product not found' });
    res.json(rows[0]);
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const { name, sku, category_id, supplier_id, qty, reorder_lvl, cost_price, sell_price, unit, location, image_url } = req.body;
    const [result] = await pool.execute(
      'INSERT INTO products (name,sku,category_id,supplier_id,qty,reorder_lvl,cost_price,sell_price,unit,location,image_url) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
      [name, sku, category_id, supplier_id||null, qty||0, reorder_lvl||10, cost_price||0, sell_price||0, unit||'pcs', location||null, image_url||null]
    );
    const [rows] = await pool.execute('SELECT * FROM products WHERE id=?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const { name, sku, category_id, supplier_id, qty, reorder_lvl, cost_price, sell_price, unit, location, image_url } = req.body;
    await pool.execute(
      'UPDATE products SET name=?,sku=?,category_id=?,supplier_id=?,qty=?,reorder_lvl=?,cost_price=?,sell_price=?,unit=?,location=?,image_url=? WHERE id=?',
      [name, sku, category_id, supplier_id||null, qty, reorder_lvl, cost_price, sell_price, unit, location||null, image_url||null, req.params.id]
    );
    const [rows] = await pool.execute('SELECT * FROM products WHERE id=?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ error: 'Product not found' });
    res.json(rows[0]);
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    await pool.execute('DELETE FROM products WHERE id=?', [req.params.id]);
    res.json({ message: 'Product deleted' });
  } catch (err) { next(err); }
};

const pool = require('../db/connection');

exports.list = async (req, res, next) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM suppliers ORDER BY name');
    res.json(rows);
  } catch (err) { next(err); }
};

exports.get = async (req, res, next) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM suppliers WHERE id=?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ error: 'Supplier not found' });
    res.json(rows[0]);
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const { name, contact, phone, email, address } = req.body;
    const [result] = await pool.execute(
      'INSERT INTO suppliers (name,contact,phone,email,address) VALUES (?,?,?,?,?)',
      [name, contact||null, phone||null, email||null, address||null]
    );
    const [rows] = await pool.execute('SELECT * FROM suppliers WHERE id=?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const { name, contact, phone, email, address } = req.body;
    await pool.execute(
      'UPDATE suppliers SET name=?,contact=?,phone=?,email=?,address=? WHERE id=?',
      [name, contact||null, phone||null, email||null, address||null, req.params.id]
    );
    const [rows] = await pool.execute('SELECT * FROM suppliers WHERE id=?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ error: 'Supplier not found' });
    res.json(rows[0]);
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    await pool.execute('DELETE FROM suppliers WHERE id=?', [req.params.id]);
    res.json({ message: 'Supplier deleted' });
  } catch (err) { next(err); }
};

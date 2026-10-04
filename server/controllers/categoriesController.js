const pool = require('../db/connection');

exports.list = async (req, res, next) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM categories ORDER BY name');
    res.json(rows);
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const { name, icon } = req.body;
    const [result] = await pool.execute('INSERT INTO categories (name, icon) VALUES (?, ?)', [name, icon||'category']);
    res.status(201).json({ id: result.insertId, name, icon: icon||'category' });
  } catch (err) { next(err); }
};

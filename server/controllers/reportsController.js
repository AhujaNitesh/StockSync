const pool = require('../db/connection');

exports.dashboard = async (req, res, next) => {
  try {
    const [[stockValue]] = await pool.execute(
      'SELECT COALESCE(SUM(qty * sell_price), 0) AS stock_value, COUNT(*) AS total_products FROM products'
    );
    const [[salesStats]] = await pool.execute(
      'SELECT COALESCE(SUM(total_amount), 0) AS total_sales, COUNT(*) AS total_bills FROM sales WHERE MONTH(sale_date)=MONTH(CURDATE()) AND YEAR(sale_date)=YEAR(CURDATE())'
    );
    const [[purchStats]] = await pool.execute(
      'SELECT COALESCE(SUM(total_cost), 0) AS total_purchases FROM purchases WHERE MONTH(purchase_date)=MONTH(CURDATE()) AND YEAR(purchase_date)=YEAR(CURDATE())'
    );
    const [[lowStockCount]] = await pool.execute(
      'SELECT COUNT(*) AS low_stock_count FROM products WHERE qty <= reorder_lvl'
    );
    res.json({
      stock_value: stockValue.stock_value,
      total_products: stockValue.total_products,
      total_sales: salesStats.total_sales,
      total_bills: salesStats.total_bills,
      total_purchases: purchStats.total_purchases,
      low_stock_count: lowStockCount.low_stock_count
    });
  } catch (err) { next(err); }
};

exports.lowStock = async (req, res, next) => {
  try {
    const [rows] = await pool.execute(
      'SELECT p.*, c.name AS category_name, s.name AS supplier_name FROM products p LEFT JOIN categories c ON p.category_id=c.id LEFT JOIN suppliers s ON p.supplier_id=s.id WHERE p.qty <= p.reorder_lvl ORDER BY p.qty ASC'
    );
    res.json(rows);
  } catch (err) { next(err); }
};

exports.salesTrend = async (req, res, next) => {
  try {
    const [rows] = await pool.execute(
      "SELECT DATE_FORMAT(sale_date, '%d %b') AS day, SUM(total_amount) AS revenue, COUNT(*) AS bills FROM sales WHERE sale_date >= CURDATE() - INTERVAL 7 DAY GROUP BY sale_date ORDER BY sale_date ASC"
    );
    res.json(rows);
  } catch (err) { next(err); }
};

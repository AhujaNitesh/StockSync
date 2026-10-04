const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function initDb() {
  const host = process.env.DB_HOST || 'localhost';
  const port = parseInt(process.env.DB_PORT) || 3306;
  const user = process.env.DB_USER || 'root';
  const password = process.env.DB_PASSWORD || '';
  const database = process.env.DB_NAME || 'general_store_db';

  try {
    const connection = await mysql.createConnection({ host, port, user, password, multipleStatements: true });
    console.log(`[DB] Connected to MySQL server at ${host}:${port} as ${user}.`);

    const schemaPath = path.join(__dirname, 'schema.sql');
    const seedPath = path.join(__dirname, 'seed.sql');

    if (fs.existsSync(schemaPath)) {
      const schemaSql = fs.readFileSync(schemaPath, 'utf8');
      await connection.query(schemaSql);
      console.log(`[DB] Database "${database}" & schema tables verified/created.`);
    }

    await connection.changeUser({ database });
    const [rows] = await connection.query('SELECT COUNT(*) as count FROM users');
    if (rows[0].count === 0 && fs.existsSync(seedPath)) {
      const seedSql = fs.readFileSync(seedPath, 'utf8');
      await connection.query(seedSql);
      console.log('[DB] Demo seed data loaded successfully.');
    } else {
      console.log('[DB] Database tables ready.');
    }

    await connection.end();
    return true;
  } catch (err) {
    console.log(`[DB INFO] Notice: Could not auto-sync MySQL (${err.code || err.message}).`);
    console.log('[DB INFO] To enable full database persistence, verify your credentials in server/.env');
    return false;
  }
}

if (require.main === module) {
  initDb();
}

module.exports = initDb;

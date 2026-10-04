const initDb = require('./init-db');
const path = require('path');

async function startAll() {
  console.log('====================================================');
  console.log('     StockSync - Sri Ganesh General Stores Portal   ');
  console.log('====================================================\n');

  // 1. Attempt database initialization/verification
  try {
    await initDb();
  } catch (e) {
    // Graceful fallback
  }

  // 2. Start Backend API & Express server (Port 5000)
  require('./app');

  // 3. Start Dedicated Frontend Server (Port 5173)
  require('./serve-frontend');

  console.log('\n----------------------------------------------------');
  console.log('  StockSync Technologies are now LIVE!');
  console.log('  - Frontend Portal:   http://localhost:5173');
  console.log('  - Unified Web App:   http://localhost:5000');
  console.log('  - REST API Base:     http://localhost:5000/api');
  console.log('----------------------------------------------------\n');
}

startAll();

const router = require('express').Router();
const ctrl = require('../controllers/reportsController');
const { protect } = require('../middleware/auth');

router.get('/dashboard',   protect, ctrl.dashboard);
router.get('/low-stock',   protect, ctrl.lowStock);
router.get('/sales-trend', protect, ctrl.salesTrend);

module.exports = router;

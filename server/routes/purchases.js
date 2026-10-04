const router = require('express').Router();
const ctrl = require('../controllers/purchasesController');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/',        protect, ctrl.list);
router.get('/:id',    protect, ctrl.get);
router.post('/',      protect, adminOnly, ctrl.create);
router.delete('/:id', protect, adminOnly, ctrl.remove);

module.exports = router;

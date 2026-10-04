const router = require('express').Router();
const ctrl = require('../controllers/productsController');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/',        protect, ctrl.list);
router.get('/:id',    protect, ctrl.get);
router.post('/',      protect, adminOnly, ctrl.create);
router.put('/:id',    protect, adminOnly, ctrl.update);
router.delete('/:id', protect, adminOnly, ctrl.remove);

module.exports = router;

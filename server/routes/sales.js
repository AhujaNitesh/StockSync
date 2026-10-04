const router = require('express').Router();
const ctrl = require('../controllers/salesController');
const { protect } = require('../middleware/auth');

router.get('/',        protect, ctrl.list);
router.get('/:id',    protect, ctrl.get);
router.post('/',      protect, ctrl.create);
router.delete('/:id', protect, ctrl.remove);

module.exports = router;

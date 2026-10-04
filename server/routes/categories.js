const router = require('express').Router();
const ctrl = require('../controllers/categoriesController');
const { protect } = require('../middleware/auth');

router.get('/',  protect, ctrl.list);
router.post('/', protect, ctrl.create);

module.exports = router;

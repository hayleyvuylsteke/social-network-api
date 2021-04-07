const router = require('express').Router();
const { addThought, editThought, removeThought } = require('../../controllers/thought-controllers');

router.route('/:pizzaId').post(addThought);
router.route('/:pizzaId').put(editThought);

router.route('/:pizzaId/:commentId').delete(removeThought);

module.exports = router;
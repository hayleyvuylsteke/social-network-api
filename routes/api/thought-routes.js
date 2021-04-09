const router = require('express').Router();
const { getThought, getThoughtById, addThought, editThought, removeThought, addReaction, removeReaction } = require('../../controllers/thought-controllers');

router.route('/').get(getThought);
router.route('/:userId').post(addThought);
router.route('/:userId').put(editThought);
router.route('/:thoughtId').get(getThoughtById)

router.route('/:userId/:thoughtId').delete(removeThought);

router.route('/:thoughtId/reactions').post(addReaction);
router.route('/:thoughtId/:reactionId')

module.exports = router;
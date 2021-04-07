const { Thought, User } = require('../models');

const reactionController = {

//create reaction
addReaction({ params, body }, res) {
    Reaction.create(body)
    .then(async ({ _id }) => {
        console.log('Reaction:' + _id)
      const thought = await Thought.findOne({ _id: params.thoughtId });
      console.log(thought)
      thoughts.reactions.push(_id);
      return thoughts.save();
    })
},

//delete reaction
removeReaction({ params }, res) {
    Reaction.findOneAndDelete({ _id: params.reactionId })
    .then(deletedReaction => {
        if (!deletedReaction) {
            return res.status(404).json({ message: 'No reaction with this id.'})
        }
          return Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { thoughts: params.thoughtId } },
            { new: true }
        )
    })
    .then(dbThoughtData => {
        if (!dbThoughtData) {
            res.status(404).json({ message: 'No thought found with this id.'})
            return
        }
        res.json(dbThoughtData)
    })
    .catch(err => res.json(err))
}

}

module.exports = reactionController;
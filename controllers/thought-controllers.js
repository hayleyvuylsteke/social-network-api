const { Thought, User } = require('../models');

const thoughtController = {
//get thoughts

getThought(req, res) {
    Thought.find({})
    .populate({
        path: 'users',
        select: '-__v'
      })
      .select('-__v')
      .sort({ _id: -1 })
    .then(dbThoughtData => {
        if (!dbThoughtData) {
            res.status(404).json({ message: 'No thoughts found.'})
            return
        }
        res.json(dbThoughtData)
    })
    .catch(err => res.json(err))
},

//get thought by ID

getThoughtById({params}, res) {
    Thought.findOne({_id: params.thoughtId})
    .populate({
        path: 'users',
        select: '-__v'
      })
    .select('-__v')
    .then(dbThoughtData => {
        if (!dbThoughtData) {
            res.status(404).json({ message: 'No thought found with this id.'})
            return
        }
        res.json(dbThoughtData)
    })
    .catch(err => res.status(400).json(err))
},

  // add thought
  addThought({ params, body }, res) {
      Thought.create(body)
      .then(async ({ _id }) => {
          console.log('ThoughtId:' + _id)
        const user = await User.findOne({ _id: params.userId });
        console.log(user)
        user.thoughts.push(_id);
        return user.save();


      /*return User.update(
          { _id: params.userId },
          { $push: { thoughts: _id } },
      )*/
      })
      .then(dbUserData => {
          if (!dbUserData) {
              res.status(404).json({ message: 'No user found with this id.'})
              return;
          }
          res.json(dbUserData)
      })
      .catch(err => {
          console.log(err);
          res.json(err);
      })
    },

    //add reaction
    addReaction({ params, body}, res) {
        Thought.findOneAndUpdate(
          { _id: params.thoughtId},
          {$push: { reactions: body}},
          { new: true }
        )
        .then(dbThoughtData => {
          if (!dbThoughtData) {
            res.status(404).json({ message: 'No thought found with this id!'})
            return
          }
          res.json(dbThoughtData);
        })
        .catch(err => res.json(err))
      },

  //edit thought - not sure this is right.
  editThought({ params, body }, res) {
    Thought.findOneAndUpdate({_id: params.thoughtId}, body, {new:true})
    .then(updatedThought => {
        if (!updatedThought) {
            res.status(404).json({ message: 'No thought with this id.'})
            return
        }
        res.json(updatedThought)
    })
    .catch(err => res.json(err))
  },

  // remove thought
  removeThought({ params }, res) {
      Thought.findOneAndDelete({ _id: params.thoughtId })
      .then(deletedThought => {
          if (!deletedThought) {
              return res.status(404).json({ message: 'No thought with this id.'})
          }
            return User.findOneAndUpdate(
              { _id: params.userId },
              { $pull: { thoughts: params.thoughtId } },
              { new: true }
          )
      })
      .then(dbUserData => {
          if (!dbUserData) {
              res.status(404).json({ message: 'No user found with this id.'})
              return
          }
          res.json(dbUserData)
      })
      .catch(err => res.json(err))
    },

    //remove reaction
    removeReaction({params}, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId}}},
            {new:true}
        )
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err))
    }
};

module.exports = thoughtController;
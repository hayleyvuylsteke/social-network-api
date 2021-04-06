const { Thought, User } = require('../models');

const thoughtController = {
  // add thought
  addThought({ params, body }, res) {
      console.log(body);
      Thought.create(body)
      .then(({ _id }) => {
      return User.findOneAndUpdate(
          {_id: params.userId},
          { $push: { thoughts: _id } },
          { new: true}
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

  //edit thought - not sure this is right.
  editThought({ params, body }, res) {
    Thought.findOneAndUpdate(body)(
        { _id: params.thoughtId},
        { $push: { thoughts: _id } },
        { new: true}
    )
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
    }
};

module.exports = thoughtController;
const { Schema, model } = require('mongoose');

const ThoughtSchema = new Schema({
    thoughtText: {
      type: String
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    username: {
      type: String,
    },
//need to add reactions
  });

// create the User model using the UserSchema
const Thought = model('Thought', ThoughtSchema);

// export the User model
module.exports = Thought;
const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    username: {
      type: String
    },
    email: {
      type: String
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    size: {
      type: String,
      default: 'Large'
    },
    thoughts: [],
    friends: []
  });

// create the User model using the UserSchema
const User = model('User', UserSchema);

// export the User model
module.exports = User;
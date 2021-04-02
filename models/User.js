const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },

    thoughts: [{ type: Schema.Types.ObjectId, ref: 'Thought' }],
    friends: [{ type: Schema.Types.ObjectId, ref: 'User '}],
  });

  UserSchema.virtual('friendCount').get(function() {
      return this.friends.length
  })

UserSchema.path('email').validate(function (email) {
    var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
    console.log(email)
    return emailRegex.test(email)
})

// create the User model using the UserSchema
const User = model('User', UserSchema);

// export the User model
module.exports = User;
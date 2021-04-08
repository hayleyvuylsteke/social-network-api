const { Schema, model, Types } = require('mongoose');
const moment = require('moment');
const ObjectId = Types.ObjectId;


const ReactionSchema = new Schema({
  reactionID: {
    type: Schema.Types.ObjectId,
    default: new ObjectId()
  },
  reactionBody: {
    type: String,
    required: true,
    maxLength: 280
  },
  username: { 
    type: Schema.Types.ObjectId, ref: 'User'
    //extra step on the find route to get the user name
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: formatDate
  }
  },
  {
    toJSON: {
      getters: true
    },
    id: false
  }
)

const ThoughtSchema = new Schema({
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280
    },

    createdAt: {
      type: Date,
      default: Date.now,
      get: formatDate
    },
    username: { 
      type: Schema.Types.ObjectId, ref: 'User'
      //extra step on the find route to get the user name
      
    },
    reactions: [ReactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
  );

function formatDate(date) {
  return moment.unix(date).format('MMMM DD, YYYY')
}

ThoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length
})


// create the User model using the UserSchema
const Thought = model('Thought', ThoughtSchema);

// export the User model
module.exports = Thought;
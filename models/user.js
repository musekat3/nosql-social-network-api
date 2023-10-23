const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ },
  thoughts: [{ type: Schema.Types.ObjectId, ref: 'Thought' }],
  friends: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

UserSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

const User = mongoose.model('User', UserSchema);

User.create([
  { username: 'Homer', email: "homer@example.com"},
  { username: 'Marge', email: "marge@example.com"},
  { username: 'Bart', email: "bart@example.com"},
  { username: 'Lisa', email: "lisa@example.com"},
  { username: 'Maggie', email: "maggie@example.com"}, 
]); 


module.exports = User;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ThoughtSchema = new Schema({
  thoughtText: { type: String, required: true, minlength: 1, maxlength: 280 },
  createdAt: { type: Date, default: Date.now },
  username: { type: String, required: true },
  reactions: [{ type: Schema.Types.ObjectId, ref: 'Reaction' }]
});

ThoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thought = mongoose.model('Thought', ThoughtSchema);

Thought.create([
  { thoughtText: "Okilly Dokilly", username: 'Ned Flanders'},
  { thoughtText: "Excellent", username: 'Mr.Burns'},
  { thoughtText: "Worst Coding Ever", username: 'Comic Book Guy'},
  { thoughtText: "Ha Ha", username: 'Nelson Muntz'},
  { thoughtText: "Hi, Everybody!", username: 'Dr.Nick'},
])

module.exports = Thought;
const mongoose = require('mongoose');
require('./models/Reaction');
const Schema = mongoose.Schema;

const ReactionSchema = new Schema({
  reactionId: { type: Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
  reactionBody: { type: String, required: true, maxlength: 280 },
  username: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Reaction = mongoose.model('Reaction', ReactionSchema);

module.exports = Reaction;
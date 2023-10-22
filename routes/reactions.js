const router = require('express').Router();
const Thought = require('../models/thought');

// POST to create a reaction stored in a single thought's `reactions` array field
router.post('/:thoughtId', async (req, res) => {
  const thought = await Thought.findById(req.params.thoughtId);
  const reaction = new Thought.reactionSchema(req.body);
  thought.reactions.push(reaction);
  await thought.save();
  res.json(thought);
});

// DELETE to pull and remove a reaction by the reaction's `reactionId` value
router.delete('/:thoughtId/:reactionId', async (req, res) => {
  const thought = await Thought.findById(req.params.thoughtId);
  thought.reactions.pull(req.params.reactionId);
  await thought.save();
  res.json(thought);
});

module.exports = router;
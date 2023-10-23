const router = require('express').Router();
const ReactionSchema = require('../models/reaction');
const Thought = require('../models/thought');

// GET all thoughts
router.get('/', async (req, res) => {
  const thoughts = await Thought.find();
  res.json(thoughts);
});

// GET a single thought by its _id
router.get('/:id', async (req, res) => {
  const thought = await Thought.findById(req.params.id).populate('reactions');
  res.json(thought);
});

// POST to create a new thought
router.post('/', async (req, res) => {
  const thought = new Thought(req.body);
  const savedThought = await thought.save();
  res.json(savedThought);
});

// PUT to update a thought by its _id
router.put('/:id', async (req, res) => {
  const updatedThought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedThought);
});

// DELETE to remove a thought by its _id
router.delete('/:id', async (req, res) => {
  const deletedThought = await Thought.findByIdAndDelete(req.params.id);
  res.json(deletedThought);
});

module.exports = router;
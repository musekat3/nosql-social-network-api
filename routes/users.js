const router = require('express').Router();
const User = require('../models/user');

// GET all users
router.get('/', async (req, res) => {
  const users = await User.find().populate('thoughts').populate('friends');
  res.json(users);
});

// GET a single user by its _id
router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id).populate('thoughts').populate('friends');
  res.json(user);
});

// POST a new user
router.post('/', async (req, res) => {
  const user = new User(req.body);
  const savedUser = await user.save();
  res.json(savedUser);
});

// PUT to update a user by its _id
router.put('/:id', async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedUser);
});

// DELETE to remove user by its _id
router.delete('/:id', async (req, res) => {
  const deletedUser = await User.findByIdAndDelete(req.params.id);
  res.json(deletedUser);
});

// POST to add a new friend to a user's friend list
router.post('/:userId/friends/:friendId', async (req, res) => {
  const user = await User.findById(req.params.userId);
  const friend = await User.findById(req.params.friendId);
  user.friends.push(friend);
  await user.save();
  res.json(user);
});

// DELETE to remove a friend from a user's friend list
router.delete('/:userId/friends/:friendId', async (req, res) => {
  const user = await User.findById(req.params.userId);
  user.friends.pull(req.params.friendId);
  await user.save();
  res.json(user);
});

module.exports = router;
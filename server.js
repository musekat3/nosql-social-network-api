const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const mongoose = require('mongoose');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const userRoutes = require('./routes/users');
const thoughtRoutes = require('./routes/thoughts');
const reactionRoutes = require('./routes/reactions');

app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);
app.use('/api/thoughts/:thoughtId/reactions', reactionRoutes);

mongoose.connect('mongodb://localhost/socialnetwork', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));
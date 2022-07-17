const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cors = require('cors');
const register = require('./routes/users');
const login = require('./routes/auth');

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost/reading-room')
.then(() => console.log('Connected to MongoDB successfuly...'))
.catch((err) => console.log('Cannot connect to MongoDB'));

app.use('/', require('./routes/storyModels'));
app.use('/users', register);
app.use('/users/login', login);

const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
    console.log(`Express server is running on port ${port}.`);
});

module.exports = server;
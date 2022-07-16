const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost/reading-room')
.then(() => console.log('Connected to MongoDB successfuly...'))
.catch((err) => console.log('Cannot connect to MongoDB'));

app.use('/', require('./routes/storyModels'));

const users = [];

app.get('/users', (req, res) => {
    res.json(users)
})

app.post('/users', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = {name: req.body.name, password: hashedPassword}
        users.push(user)
        return res.status(201).send(`Welcome, ${user.name}!`)
    } catch {
        res.status(500).send()
    }
})

app.post('/users/login', async (req, res) => {
    const user = users.find(user => user.name === req.body.name)
    if (user == null) {
        return res.status(400).send('User not found!')
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            res.send(`Welcome, ${user.name}!`)
        } else {
            return res.status(400).send('Incorrect username or password.')
        }
    } catch {
        res.status(500).send()
    }
})

app.listen(4000, () => {
    console.log('Express server is running on port 4000.');
}) 
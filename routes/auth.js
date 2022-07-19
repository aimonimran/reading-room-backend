const { User } = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
        return res.status(400).send('User not found!');
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            res.send(`Welcome, ${user.username}!`);
        } else {
            return res.status(400).send('Incorrect username or password.');
        }
    } catch {
        res.status(500).send();
    }
})

module.exports = router;
const Story = require('../models/storyModel');
const express = require('express');
const router = express.Router();

router.route('/write').post((req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const newStory = new Story({
        title,
        description
    });
    newStory.save();
});

module.exports = router;
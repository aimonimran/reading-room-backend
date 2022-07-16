const Story = require('../models/storyModel');
const express = require('express');
const router = express.Router();

router.route('/write').post((req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const story = req.body.story;
    const newStory = new Story({
        title,
        description,
        story
    });
    newStory.save();
});

router.route('/localauthors').get((req, res) => {
    Story.find()
        .then(foundStory => res.json(foundStory));
});

module.exports = router;
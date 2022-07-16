const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    story: {
        type: String,
        required: true
    }
});

const Story = mongoose.model('Story', storySchema);

module.exports = Story;
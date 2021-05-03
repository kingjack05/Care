const mongoose = require('mongoose')

const voteSchema = new mongoose.Schema({
    voter:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true,
        required: true
    },
    upvote: {
        type: Boolean,
        required: true
    }
})

module.exports = voteSchema
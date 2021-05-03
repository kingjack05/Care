const mongoose = require('mongoose')

const voteSchema = require('./Subdocument Schema/voteSchema')

const commentSchema = new mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    },
    content: {
        type: String
    },
    votes: {
        type: [voteSchema]
    }
},{
    timestamps: true
}
)

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment
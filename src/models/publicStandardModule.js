const mongoose = require('mongoose')

//Child Schema
const rowSchema = new mongoose.Schema({
    field: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Datapoint'
    },
    tip: {
        type: String
    }
})

const standardBlockSchema = new mongoose.Schema({
    content:{
        type: [rowSchema]
    },
    title: {
        type: String
    },
    tip: {
        type: String
    }
})

//Parent Schema
const publicStandardModuleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: [standardBlockSchema]
    },
    tip: {
        type: String
    },
    comments: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Comment'
    },
    votes: {
        type: [voteSchema]
    },
    votingScore: {
        type: Number,
        default: 0
    }
},{ //Options
    timestamps: true
})

//Middleware


const PublicStandardModule = mongoose.model('PublicModule', publicStandardModuleSchema)

module.exports = PublicStandardModule
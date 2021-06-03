const mongoose = require("mongoose")

//Child Schema
const exportSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    content: {
        type: String,
    },
})

const rowSchema = new mongoose.Schema({
    field: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Datapoint",
    },
    tip: {
        type: String,
    },
    on: {
        type: Date,
    },
    since: {
        type: Date,
    },
})

const standardBlockSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    content: {
        type: [rowSchema],
    },
    tip: {
        type: String,
    },
    text: {
        type: String,
    },
})

//Parent Schema
const publicStandardModuleSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        content: {
            type: [standardBlockSchema],
        },
        tip: {
            type: String,
        },
        comments: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "Comment",
        },
        votes: {
            type: [voteSchema],
        },
        votingScore: {
            type: Number,
            default: 0,
        },
        exports: {
            type: [exportSchema],
        },
        exportsTo: {
            type: [String],
            enum: ["Admission Form", "SOAP", "Others"],
        },
    },
    {
        //Options
        timestamps: true,
    }
)

//Middleware

const PublicStandardModule = mongoose.model(
    "PublicModule",
    publicStandardModuleSchema
)

module.exports = PublicStandardModule

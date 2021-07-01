const mongoose = require("mongoose")

const workupSchema = new mongoose.Schema(
    {
        module: { type: mongoose.Schema.Types.ObjectId },
        moduleName: { type: String },
        publicOrNot: { type: Boolean },
        category: { type: String, enum: ["Standard", "Decision tree"] },
        values: {},
    },
    { timestamps: true }
)

const noteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
        },
        archived: {
            type: Boolean,
            required: true,
            default: false,
        },
        encounterType: {
            type: String,
            enum: ["Ambulatory", "Emergency", "Home health", "Inpatient", "Outpatient", "Virtual"],
        },
        shortSummary: {
            type: String,
        },
        admittedDate: {
            type: Date,
        },
        primaryCaretaker: {
            type: String,
        },
        workups: {
            type: [workupSchema],
        },
        owner: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "User",
        },
        patient: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "Patient",
        },
    },
    {
        timestamps: true,
    }
)

const Note = mongoose.model("Note", noteSchema)

module.exports = Note

const mongoose = require("mongoose")

const workupSchema = new mongoose.Schema({
    module: { type: [mongoose.Schema.Types.ObjectId] },
    category: { type: String, enum: ["Standard", "Decision tree"] },
})

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
            enum: [
                "Ambulatory",
                "Emergency",
                "Home health",
                "Inpatient",
                "Outpatient",
                "Virtual",
            ],
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
    },
    {
        timestamps: true,
    }
)

const Note = mongoose.model("Note", noteSchema)

module.exports = Note

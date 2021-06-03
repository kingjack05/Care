const mongoose = require("mongoose")

const familyHistorySchema = new mongoose.Schema({
    familyMember: {
        type: String,
    },
    diagnosis: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Diagnosis",
    },
})
const historySchema = new mongoose.Schema({
    riskFactors: {
        type: [String],
    },
    familyHistory: {
        type: [familyHistorySchema],
    },
    surgicalHistory: {},
    lifestyle: {
        type: [String],
    },
})
const pastEncounterSchema = new mongoose.Schema(
    {
        shortSummary: {
            type: String,
        },
        detailedSummary: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
)

const patientSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    archived: {
        type: Boolean,
        required: true,
        default: false,
    },
    age: {
        type: Number,
    },
    sex: {
        type: Boolean,
    },
    shortSummary: {
        type: String,
        maxLength: 75, //Restrict length for mobile rendering
    },
    presentDiagnosis: {
        type: [String],
    },
    allergies: {
        type: [String],
    },
    medications: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Drug",
    },
    history: {
        type: historySchema,
    },
    notes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Note",
    },
    pastEncounters: {
        type: [pastEncounterSchema],
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    canEdit: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
    },
    canView: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
    },
})

const Patient = mongoose.model("Patient", patientSchema)

module.exports = Patient

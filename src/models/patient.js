const mongoose = require('mongoose')

const patientSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    archived: {
        type: Boolean,
        required: true,
        default: false
    },
    admittedDate: {
        type: Date
    },
    primaryCaretaker: {
        type: String
    },
    age: {
        type: Number
    },
    sex: {
        type: Boolean
    },
    shortSummary: {
        type: String
    },
    presentDiagnosis: {
        type: [mongoose.Schema.Types.ObjectId]
    }
})

const Patient = mongoose.model('Patient', patientSchema)

module.exports = Patient
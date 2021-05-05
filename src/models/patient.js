const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    title: {
        type: String
    }, 
    archived: {
        type: Boolean,
        required: true,
        default: false        
    }
}, 
{
    timestamps: true
})

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
        type: String,
        maxLength: 75 //Restrict length for mobile rendering
    },
    presentDiagnosis: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Diagnosis'
    },
    notes: {
        type: [noteSchema],
    },
    owners: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        required: true
    },
    canView: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User'
    }
})

const Patient = mongoose.model('Patient', patientSchema)

module.exports = Patient
const mongoose = require('mongoose')

const personalHistorySchema = new mongoose.Schema({
    allergies: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Allergy'
    }, 
    currentMedications: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Drug'
    }
})

const admissionNoteSchema = new mongoose.Schema({
    chiefComplaint: {
        type: String
    },
    presentIllness: {
        type: String
    },
    pastHistory: {
        type: String
    },
    personalHistory: {
        type: personalHistorySchema
    }, 
    familyHistory: {
        type: String
    },

})

const AdmissionNote = mongoose.model('AdmissionNote', admissionNoteSchema)

module.exports = AdmissionNote
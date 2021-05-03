const mongoose = require('mongoose')

const diagnosisSchema = new mongoose.Schema({
    symptoms: {
        type: String
    },
    diagnosis: {
        type: String
    },
    treatment: {
        type: String
    },
    recommendedPublicStandardModules: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'PublicStandardModule'
    },
    recommendedPublicDecisionTreeModules: {

    }
},{
    timestamps: true
})

const Diagnosis = mongoose.model('Diagnosis', diagnosisSchema)

module.exports = Diagnosis
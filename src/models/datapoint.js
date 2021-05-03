const mongoose = require('mongoose')

const datapointSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    datapointType:{
        type: String,
        required: true,
        enum: ['String', 'Number', 'Single Choice', 'Multiple Choice']
    },
    category:{
        type: String,
        required: true,
        enum: ['Symptom', 'Sign', 'Physical Examination', 'Lab Data', 'Imaging', 'Test', 'Other'],
        default: 'Other'
    },
    normalValue: {}
})

const Datapoint = mongoose.model('Datapoint', datapointSchema)

module.exports = Datapoint
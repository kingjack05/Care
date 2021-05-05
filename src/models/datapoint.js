const mongoose = require('mongoose')

const optionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    optionType: {
        type: String,
        required: true,
        enum: ['String', 'Boolean', 'Number', 'Single Choice', 'Multiple Choice', 'Array'],
        default: 'String'
    },
    data: {
    }
})

const datapointSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    datapointType:{
        type: String,
        required: true,
        enum: ['String', 'Boolean', 'Number', 'Single Choice', 'Multiple Choice', 'Array'],
        default: 'String'
    },
    category:{
        type: String,
        required: true,
        enum: ['Symptom', 'Sign', 'Physical Examination', 'Lab Data', 'Imaging', 'Test', 'Other'],
        default: 'Other'
    },
    normalValue: {},
    options: {
        type: [optionSchema]
    }
})

const Datapoint = mongoose.model('Datapoint', datapointSchema)

module.exports = Datapoint
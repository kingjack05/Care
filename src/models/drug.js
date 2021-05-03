const mongoose = require('mongoose')

const drugScehma = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    
})

const Drug = mongoose.model('Drug', drugScehma)

module.exports = Drug
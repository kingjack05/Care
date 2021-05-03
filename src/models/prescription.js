const mongoose = require('mongoose')

const prescriptionSchema = new mongoose.Schema({
    category:{
        type: String,
        enum: ['Drug', 'Lifestyle', 'Operation']
    },
    startingDate: {
        type: Date,
    }
})

const Prescription = mongoose.model('Prescription', prescriptionSchema)

module.exports = Prescription
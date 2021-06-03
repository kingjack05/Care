const mongoose = require("mongoose")

const drugScehma = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    RXCUI: {
        type: String,
        required: true,
    },
    doseForm: {
        type: String,
    },
    route: {
        type: String,
    },
    strength: {
        type: String,
    },
    synonym: {
        type: String,
    },
})

const Drug = mongoose.model("Drug", drugScehma)

module.exports = Drug

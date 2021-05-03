const mongoose = require('mongoose')

const scoreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    public: {
        type: Boolean,
        required: true,
        default: false
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},
{   //Options
    timestamps: true
})

const Score = mongoose.model('Score', scoreSchema)

module.exports = Score
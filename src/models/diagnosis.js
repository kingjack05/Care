const mongoose = require("mongoose")

const diagnosisSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        symptoms: {
            type: String,
        },
        diagnosis: {
            type: String,
        },
        treatment: {
            type: String,
        },
        recommendedPublicStandardModules: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "PublicStandardModule",
        },
        recommendedPublicDecisionTreeModules: {},
    },
    {
        timestamps: true,
    }
)

const Diagnosis = mongoose.model("Diagnosis", diagnosisSchema)

module.exports = Diagnosis

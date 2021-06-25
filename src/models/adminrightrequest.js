const mongoose = require("mongoose")

const adminrightrequestSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    request: {
        type: String,
        enum: ["Administrator", "Contributor"],
        required: true,
    },
})

const Adminrightrequest = mongoose.model("Adminrightrequest", adminrightrequestSchema)

module.exports = Adminrightrequest

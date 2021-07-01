const Patient = require("../models/patient")

const verifyThatPatientBelongsToUser = async (req, res, next) => {
    try {
        const userID = req.user._id.toString()
        const patient = await Patient.findById(req.query.patientID)
        const usersWhoCanEditPatient = patient.canEdit.map((element) => element.toString())

        if (patient.owner.toString() === userID || usersWhoCanEditPatient.includes(userID)) {
            next()
        } else {
            console.log("something wrong")
            return res.status(401).send({ error: "Invalid request" })
        }
    } catch (error) {
        console.log(error)
        return res.status(401).send({ error: "Invalid request" })
    }
}

module.exports = verifyThatPatientBelongsToUser

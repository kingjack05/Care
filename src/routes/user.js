const express = require("express")
const auth = require("../middleware/auth")

const router = new express.Router()

//Import models
const User = require("../models/user")
const Patient = require("../models/patient")
const Adminrightrequest = require("../models/adminrightrequest")

//Request admin rights
router.post("/users/requestAdmin/:right", auth, async (req, res) => {
    const user = req.user
    try {
        const data = { user: user._id, requset: req.params.right }
        const adminrightrequest = new Adminrightrequest(data)
        await adminrightrequest.save()
        res.status(201).send()
    } catch (e) {
        res.status(500).send(e)
    }
})

//Authentication
router.post("/users", async (req, res) => {
    const userData = (({ name, email, password }) => ({ name, email, password }))(req.body)
    const user = new User(userData)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user: user.getPublicProfile(), token })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post("/users/login", async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user: user.getPublicProfile(), token })
    } catch (error) {
        res.status(400).send()
    }
})

router.post("/users/logout", auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

router.post("/users/logoutAll", auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()

        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

router.get("/users/me", auth, async (req, res) => {
    try {
        const user = req.user
        res.send(user.getPublicProfile())
    } catch (e) {
        res.status(500).send()
    }
})

router.patch("/users/me", auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ["name", "email", "password"]
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidUpdate) {
        return res.status(400).send({ error: "Invalid update!" })
    }

    try {
        const user = req.user
        updates.forEach((update) => (user[update] = req.body[update]))
        await user.save()
        res.send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete("/users/me", auth, async (req, res) => {
    try {
        await req.user.remove()
        res.send()
    } catch (error) {
        res.status(500).send({ error: error })
    }
})

// Create new patient data
router.post("/users/me/addPatient", auth, async (req, res) => {
    const user = req.user
    const patient = new Patient(req.body)
    try {
        patient.owner = user._id
        await patient.save()
        res.send(patient)
    } catch (error) {
        res.status(500).send({ error: error })
    }
})
// Read patient list
router.get("/users/me/patients", auth, async (req, res) => {
    const user = req.user
    const patients = await Patient.find(
        { owner: user._id, archived: false },
        "_id age sex presentDiagnosis shortSummary title"
    )
    try {
        res.send(patients)
    } catch (error) {
        res.status(500).send({ error: error })
    }
})
router.get("/users/me/patients/archived", auth, async (req, res) => {
    const user = req.user
    const patients = await Patient.find(
        { owner: user._id, archived: true },
        "_id age sex presentDiagnosis shortSummary title",
        { sort: { title: 1 } }
    )
    try {
        res.send(patients)
    } catch (error) {
        res.status(500).send({ error: error })
    }
})
router.get("/users/me/patients/:skip", auth, async (req, res) => {
    const user = req.user
    const skip = parseInt(req.params.skip, 10)
    const limit = 10
    const patients = await Patient.find(
        { owner: user._id },
        "_id age sex presentDiagnosis shortSummary title",
        {
            skip,
            limit,
        }
    )
    try {
        res.send(patients)
    } catch (error) {
        res.status(500).send({ error: error })
    }
})
// Get patient detail
router.get("/users/me/patient/:id", auth, async (req, res) => {
    const user = req.user
    const _id = req.params.id //Patient ID
    const patient = await Patient.findById(_id)
    // Check if user is patient's owner
    const isValidPatient = patient.owner.toString() === user._id.toString()
    if (!isValidPatient) {
        return res.status(404).send({ error: "Invalid patient!" })
    }
    try {
        res.send(patient)
    } catch (error) {
        res.status(500).send({ error: error })
    }
})
// Update patient data
router.patch("/users/me/updatePatient/:id", auth, async (req, res) => {
    const user = req.user
    const _id = req.params.id //Patient ID
    const patient = await Patient.findById(_id)
    // Check if user is patient's owner
    const isValidPatient = patient.owner.toString() === user._id.toString()
    if (!isValidPatient) {
        return res.status(404).send({ error: "Invalid patient!" })
    }
    const updates = Object.keys(req.body)
    try {
        updates.forEach((update) => (patient[update] = req.body[update]))
        await patient.save()
        res.send(patient)
    } catch (error) {
        res.status(500).send({ error: error })
    }
})
// Delete patient data
router.delete("/users/me/patient/:id", auth, async (req, res) => {
    const user = req.user
    const _id = req.params.id //Patient ID
    const patient = await Patient.findById(_id)
    // Check if user is patient's owner
    const isValidPatient = patient.owner.toString() === user._id.toString()
    if (!isValidPatient) {
        return res.status(404).send({ error: "Invalid patient!" })
    }
    try {
        await Patient.findByIdAndDelete(_id)
        return res.send("Successful deletion!")
    } catch (error) {
        return res.status(500).send({ error: error })
    }
})
//TODO: Share patient
//patient.canEdit.push(id)

module.exports = router

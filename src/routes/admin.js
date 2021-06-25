const express = require("express")
const auth = require("../middleware/auth")

const router = new express.Router()

//Import models
const Adminrightrequest = require("../models/adminrightrequest")
const Datapoint = require("../models/datapoint")
const Diagnosis = require("../models/diagnosis")
const Drug = require("../models/drug")

// Create new datapoint, diagnosis and drug data
router.post("/admin/create/datapoint", auth, async (req, res) => {
    const user = req.user
    const isAdmin = user.authorization === "Administrator"
    const fields = Object.keys(req.body)
    const allowedFields = ["name", "datapointType", "category", "normalValue", "SCTID", "LOINCNUM"]
    const isValidField = fields.every((update) => allowedFields.includes(update))

    if (!isAdmin) {
        return res.status(403).send({ error: "No admin rights!" })
    }
    if (!isValidField) {
        return res.status(400).send({ error: "Contains invalid field!" })
    }

    try {
        const datapoint = new Datapoint(req.body)
        await datapoint.save()
        res.send(datapoint)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post("/admin/create/diagnosis/", auth, async (req, res) => {
    const user = req.user
    const isAdmin = user.authorization === "Administrator"
    const fields = Object.keys(req.body)
    const allowedFields = [
        "name",
        "symptoms",
        "diagnosis",
        "treatment",
        "recommendedPublicStandardModules",
        "recommendedPublicDecisionTreeModules",
        "SCTID",
    ]
    const isValidField = fields.every((update) => allowedFields.includes(update))

    if (!isAdmin) {
        return res.status(403).send({ error: "No admin rights!" })
    }
    if (!isValidField) {
        return res.status(400).send({ error: "Contains invalid field!" })
    }

    try {
        const dianosis = new Diagnosis(req.body)
        await dianosis.save()
        res.send(dianosis)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post("/admin/create/drug", auth, async (req, res) => {
    const user = req.user
    const isAdmin = user.authorization === "Administrator"
    const fields = Object.keys(req.body)
    const allowedFields = ["name", "RXCUI", "doseForm", "route", "strength", "synonym"]
    const isValidField = fields.every((update) => allowedFields.includes(update))

    if (!isAdmin) {
        return res.status(403).send({ error: "No admin rights!" })
    }
    if (!isValidField) {
        return res.status(400).send({ error: "Contains invalid field!" })
    }

    try {
        const drug = new Drug(req.body)
        await drug.save()
        res.send(drug)
    } catch (error) {
        res.status(400).send(error)
    }
})

// Update datapoint, diagnosis and drug data
router.post("/admin/update/datapoint/:id", auth, async (req, res) => {
    const user = req.user
    const isAdmin = user.authorization === "Administrator"
    const updates = Object.keys(req.body)
    const allowedUpdates = ["name", "datapointType", "category", "normalValue", "SCTID", "LOINCNUM"]
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))

    if (!isAdmin) {
        return res.status(403).send({ error: "No admin rights!" })
    }
    if (!isValidUpdate) {
        return res.status(400).send({ error: "Invalid update!" })
    }

    try {
        const datapoint = Datapoint.findById(req.params.id)
        updates.forEach((update) => (datapoint[update] = req.body[update]))
        await datapoint.save()
        res.send(datapoint)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post("/admin/update/diagnosis/:id", auth, async (req, res) => {
    const user = req.user
    const isAdmin = user.authorization === "Administrator"
    const updates = Object.keys(req.body)
    const allowedUpdates = [
        "name",
        "symptoms",
        "diagnosis",
        "treatment",
        "recommendedPublicStandardModules",
        "recommendedPublicDecisionTreeModules",
        "SCTID",
    ]
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))

    if (!isAdmin) {
        return res.status(403).send({ error: "No admin rights!" })
    }
    if (!isValidUpdate) {
        return res.status(400).send({ error: "Invalid update!" })
    }

    try {
        const dianosis = Diagnosis.findById(req.params.id)
        updates.forEach((update) => (dianosis[update] = req.body[update]))
        await dianosis.save()
        res.send(dianosis)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post("/admin/update/drug/:id", auth, async (req, res) => {
    const user = req.user
    const isAdmin = user.authorization === "Administrator"
    const updates = Object.keys(req.body)
    const allowedUpdates = ["name", "RXCUI", "doseForm", "route", "strength", "synonym"]
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))

    if (!isAdmin) {
        return res.status(403).send({ error: "No admin rights!" })
    }
    if (!isValidUpdate) {
        return res.status(400).send({ error: "Invalid update!" })
    }

    try {
        const drug = Drug.findById(req.params.id)
        updates.forEach((update) => (datapoint[update] = req.body[update]))
        await drug.save()
        res.send(drug)
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router

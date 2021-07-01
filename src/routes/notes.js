const express = require("express")

const auth = require("../middleware/auth")
const verifyThatPatientBelongsToUser = require("../middleware/verifyThatPatientBelongsToUser")

const router = new express.Router()

//Import models
const Note = require("../models/note")

//Using middleware
router.use(auth)
router.use(verifyThatPatientBelongsToUser)

router.post("/notes/create", async (req, res) => {
    const user = req.user
    const createdNote = new Note(req.body)
    createdNote.owner = user._id
    try {
        await createdNote.save()
        return res.status(201).send(createdNote)
    } catch (error) {
        return res.status(500).send(error)
    }
})
//Get list of notes
router.get("/notes", async (req, res) => {
    const user = req.user
    try {
        const response = await Note.find({ owner: user._id })

        return res.status(200).send(response)
    } catch (error) {
        return res.status(500).send(error)
    }
})
//Get individual note
router.get("/notes/:id", async (req, res) => {
    try {
        const response = await Note.findById(req.params.id)

        return res.status(200).send(response)
    } catch (error) {
        return res.status(500).send(error)
    }
})
router.post("/notes/update/:id", async (req, res) => {
    try {
        const response = await Note.findByIdAndUpdate(req.params.id, req.body)

        return res.status(200).send(response)
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
})
router.delete("/notes/:id", async (req, res) => {
    try {
        await Note.findByIdAndDelete(req.params.id)

        return res.status(200).send()
    } catch (error) {
        return res.status(500).send(error)
    }
})

module.exports = router

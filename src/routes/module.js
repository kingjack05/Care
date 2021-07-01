const express = require("express")
const auth = require("../middleware/auth")
const _ = require("lodash")

const router = new express.Router()

//Import models
const User = require("../models/user")
const Patient = require("../models/patient")
const PublicStandardModule = require("../models/publicStandardModule")

//Create module
router.post("/users/me/createModule/PublicStandardModule", auth, async (req, res) => {
    const user = req.user
    const module = new PublicStandardModule(req.body)
    try {
        module.createdBy = user._id
        await module.save()
        res.status(201).send()
    } catch (e) {
        res.status(400).send(e)
    }
})
//Get module
router.get("/publicStandardModule/:id", async (req, res) => {
    try {
        const publicStandardModule = await PublicStandardModule.findById(req.params.id).populate(
            "content.content.field"
        )
        if (!publicStandardModule) {
            throw new Error("Did not find module!")
        }
        return res.send(publicStandardModule)
    } catch (error) {
        res.status(500).send({ error: error })
    }
})

router.get("/users/me/PublicStandardModules", auth, async (req, res) => {
    const user = req.user
    const modules = await PublicStandardModule.find({ createdBy: user._id }, "_id name")
    try {
        res.send(modules)
    } catch (error) {
        res.status(500).send({ error: error })
    }
})
//Update module
router.post("/users/me/module/:category/:id", auth, async (req, res) => {
    const allowedUpdates = ["exportsTo", "name", "content", "exports"]
    switch (req.params.category) {
        case "PublicStandard":
            const filteredUpdates = _.pick(req.body, allowedUpdates)
            const response = await PublicStandardModule.findByIdAndUpdate(
                req.params.id,
                filteredUpdates
            )
            try {
                res.status(200).send(response)
            } catch (error) {
                console.log(error)
                res.status(500).send({ error: error })
            }
            break
        default:
            break
    }
})
//Delete module
router.delete("/users/me/module/:category/:id", auth, async (req, res) => {
    switch (req.params.category) {
        case "PublicStandard":
            const response = await PublicStandardModule.findByIdAndDelete(req.params.id)
            try {
                res.send(response)
            } catch (error) {
                res.status(500).send({ error: error })
            }
            break
        default:
            break
    }
})
module.exports = router

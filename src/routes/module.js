const express = require("express")
const auth = require("../middleware/auth")

const router = new express.Router()

//Import models
const User = require("../models/user")
const Patient = require("../models/patient")
const PublicStandardModule = require("../models/publicStandardModule")

//Create module
router.post(
    "/users/me/createModule/PublicStandardModule",
    auth,
    async (req, res) => {
        const module = new PublicStandardModule(req.body)
        try {
            await module.save()
            res.status(201).send()
        } catch (e) {
            res.status(400).send(e)
        }
    }
)

module.exports = router

const express = require("express")

const router = new express.Router()

const Drug = require("../models/drug")

router.get("/drug/:id", async (req, res) => {
    try {
        const drug = await Drug.findById(req.params.id)
        if (!drug) {
            throw new Error("Did not find drug!")
        }
        return res.send(drug)
    } catch (error) {
        res.status(500).send({ error: error })
    }
})

module.exports = router

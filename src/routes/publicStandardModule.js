const express = require('express')

const router = new express.Router()

const PublicStandardModule = require('../models/publicStandardModule')

router.get('/publicStandardModule/:id', async (req, res) => {
    try {
        const publicStandardModule = await PublicStandardModule.findById(req.params.id)
        if (!publicStandardModule) {
            throw new Error('Did not find module!')
        }
        return res.send(publicStandardModule)
    } catch (error) {
        res.status(500).send({error: error})
    }
})

module.exports = router
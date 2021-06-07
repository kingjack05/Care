const express = require("express")

// Load models
const Datapoint = require("../models/datapoint")
const Diagnosis = require("../models/diagnosis")

const router = new express.Router()

// Autocomplete routes
// Datapoint
router.get("/search/datapoint", async (req, res) => {
    try {
        const result = await Datapoint.aggregate([
            {
                $search: {
                    index: "Autocomplete for datapoint name",
                    autocomplete: {
                        query: `${req.query.query}`,
                        path: "name",
                        fuzzy: {
                            maxEdits: 2,
                            prefixLength: 3,
                        },
                    },
                },
            },
        ])
        res.send(result)
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
})
// Diagnosis
router.get("/search/diagnosis", async (req, res) => {
    try {
        const result = await Diagnosis.aggregate([
            {
                $search: {
                    index: "Autocomplete for diagnosis name",
                    autocomplete: {
                        query: `${req.query.query}`,
                        path: "name",
                        fuzzy: {
                            maxEdits: 2,
                            prefixLength: 3,
                        },
                    },
                },
            },
        ])
        res.send(result)
    } catch (error) {
        res.status(500).send({ error: error })
    }
})
// Drugs
router.get("/search/drug", async (req, res) => {
    try {
        const result = await Drug.aggregate([
            {
                $search: {
                    index: "Autocomplete for drug name and synonym",
                    compound: {
                        should: [
                            {
                                autocomplete: {
                                    query: `${req.query.query}`,
                                    path: "name",
                                    fuzzy: {
                                        maxEdits: 2,
                                        prefixLength: 3,
                                    },
                                },
                            },

                            {
                                autocomplete: {
                                    query: `${req.query.query}`,
                                    path: "synonym",
                                    fuzzy: {
                                        maxEdits: 2,
                                        prefixLength: 3,
                                    },
                                },
                            },
                        ],
                        minimumShouldMatch: 1,
                    },
                },
            },
        ])
        res.send(result)
    } catch (error) {
        res.status(500).send({ error: error })
    }
})

module.exports = router

// router.get('/datapoint/:id', async (req, res) => {
//     try {
//         const datapoint = await Datapoint.findById(req.params.id)
//         if (!datapoint) {
//             throw new Error('Did not find datapoint!')
//         }
//         return res.send(datapoint)
//     } catch (error) {
//         res.status(500).send({error: error})
//     }
// })

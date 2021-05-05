const express = require('express')
const auth = require ('../middleware/auth')

const router = new express.Router()

//Import models
const User = require('../models/user')
const Patient = require('../models/patient')
const { findById } = require('../models/user')

router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user: user.getPublicProfile(), token})
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user: user.getPublicProfile(), token})
    } catch (error) {
        res.status(400).send()
    }
})

router.post('/users/logout', auth, async (req, res) => {
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

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()

        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

router.get('/users/me', auth, async (req, res) => {
    try {
        const user = req.user
        res.send(user.getPublicProfile())
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/users/me', auth, async (req, res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password']
    const isValidUpdate = updates.every((update)=>allowedUpdates.includes(update))

    if (!isValidUpdate){
        return res.status(400).send({error: "Invalid update!"})
    }

    try {
        const user = req.user
        updates.forEach((update) => user[update] = req.body[update])
        await user.save()
        res.send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/users/me', auth, async (req, res) => {
    try{
        await req.user.remove()
        res.send()
    }catch(error){
        res.status(500).send({error: error})
    }
})

// Create new patient data
router.post('/users/me/addPatient', auth, async (req, res) => {
    const user = req.user
    const patient = new Patient(req.body)
    try {
        patient.owners.push(user._id)
        await patient.save()
        res.send(patient)
    } catch (error) {
        res.status(500).send({error: error})
    }
})
// Read patient list

// Update patient data
router.patch('/users/me/updatePatient/:id', auth, async (req, res) => {
    const user = req.user
    const _id = req.params.id //Patient ID
    const patient = await Patient.findById(_id)
    // Check if user is patient's owner
    const isValidPatient = patient.owners.includes(user._id)
    if (!isValidPatient){
        return res.status(404).send({error: 'Invalid patient!'})
    }
    const updates = Object.keys(req.body)
    try {
        updates.forEach( (update) => patient[update] = req.body[update])
        await patient.save()
        res.send(patient)
    } catch (error) {
        res.status(500).send({error: error})
    }
})
// Delete patient data

module.exports = router
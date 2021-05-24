const mongoose = require("mongoose")

// Import model
const Diagnosis = require("../models/diagnosis")
// Import data
const diagnosisData = require("../data/diagnosisData")

async function writediagnosisData(data) {
    data.forEach(async (element) => {
        const obj = await Diagnosis.findOne({ name: element.name })
        if (!obj) {
            //Save new object
            try {
                const newObject = new Diagnosis(element)
                await newObject.save()
            } catch (error) {
                console.log(error)
            }
        } else {
            //Replace object
            try {
                await obj.replaceOne(element)
            } catch (error) {
                console.log(error)
            }
        }
    })
}

writediagnosisData(diagnosisData)

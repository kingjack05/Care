const mongoose = require("mongoose")

// Import model
const Drug = require("../models/drug")
// Import data
const drugData = require("../data/drugData")

async function writedrugData(data) {
    data.forEach(async (element) => {
        const obj = await Drug.findOne({ name: element.name })
        if (!obj) {
            //Save new object
            try {
                const newObject = new Drug(element)
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

writedrugData(drugData)

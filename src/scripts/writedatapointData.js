const mongoose = require("mongoose")

// Import model
const Datapoint = require("../models/datapoint")
// Import data
const datapointData = require("../data/datapointData")

async function writedatapointData(data) {
    data.forEach(async (element) => {
        const obj = await Datapoint.findOne({ name: element.name })
        if (!obj) {
            //Save new object
            try {
                const newObject = new Datapoint(element)
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

writedatapointData(datapointData)

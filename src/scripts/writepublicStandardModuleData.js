const mongoose = require("mongoose")

// Import model
const PublicStandardModule = require("../models/publicStandardModule")
// Import data
const publicStandardModuleData = require("../data/publicStandardModuleData")

async function writepublicStandardModuleData(data) {
    data.forEach(async (element) => {
        const obj = await PublicStandardModule.findOne({ name: element.name })
        if (!obj) {
            //Write new object
            try {
                const newObject = new PublicStandardModule(element)
                await newObject.save()
                console.log("New object created!")
            } catch (error) {
                console.log(error)
            }
        } else {
            //Replace object
            try {
                await obj.replaceOne(element)
                console.log("Object Updated!")
            } catch (error) {
                console.log(error)
            }
        }
    })
}

writepublicStandardModuleData(publicStandardModuleData)

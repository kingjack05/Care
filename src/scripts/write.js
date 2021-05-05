const mongoose = require('mongoose')

// Import model
const Datapoint = require('../models/datapoint')
// Import data
const datapointData = require('../data/datapointData')

async function write(data) {
    data.forEach(async element => {
        const obj = await Datapoint.findOne({ name: element.name })
        if (!obj) { //Write new object
            try {
                const newObject = new Datapoint(element)
                await newObject.save()
                console.log('New object created!')
            } catch (error) {
                console.log(error)
            }
        } else {    //Replace object
            try {
                await obj.replaceOne(element)
                console.log('Object Updated!')
            } catch (error) {
                console.log(error)
            }
        }
    })
}

write(datapointData)
const mongoose = require('mongoose')
const keys = require('../keys')

const url = keys.mongoDBConnectionString

mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
const express = require('express')
//Run connection
require('./db/mongoose')
//Run script
// require('./scripts/write')

const userRouter = require('./routes/user.js')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
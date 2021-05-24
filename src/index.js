const express = require("express")
const cors = require("cors")
//Run connection
require("./db/mongoose")
// Run script to...
// Update data
// require('./scripts/writedatapointData')

//import routes
const userRouter = require("./routes/user.js")
const searchRouter = require("./routes/search")

const app = express()
const port = process.env.PORT || 3001

//Use CORS middleware (dev only)
app.use(cors())

app.use(express.json())
app.use(userRouter)
app.use(searchRouter)

app.listen(port, () => {
    console.log("Server is up on port " + port)
})

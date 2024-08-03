const express = require("express")
const app = express()
const cors = require("cors")
const color = require("colors")
const { connectDB } = require("./config/db")
require("dotenv").config()
const PORT = process.env.PORT

connectDB()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.status(200).json({ message: "Welcome to Razor Payment Gateway" })
})

app.use('/api/payment', require("./router/paymentRouter"))

app.listen(PORT, () => {
    console.log(`PORT is running on ${PORT}`.bgMagenta);
})


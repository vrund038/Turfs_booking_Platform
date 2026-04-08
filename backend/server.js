const express = require("express")
const cors = require("cors")

const turfRoutes = require("./routes/turfRoutes")

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req,res)=>{
    res.send("Turf Booking API Running")
})

app.use("/api/turfs", turfRoutes)

app.listen(5000,()=>{
    console.log("Server running on port 5000")
})
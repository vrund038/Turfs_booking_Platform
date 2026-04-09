const express = require("express")
const cors = require("cors")

const turfRoutes = require("./routes/turfRoutes")
const bookingRoutes = require("./routes/bookingRoutes")

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req,res)=>{
    res.send("Turf Booking API Running")
})

app.use("/api/turfs", turfRoutes)
app.use("/api/bookings", bookingRoutes)

app.listen(5000,()=>{
    console.log("Server running on port 5000")
})
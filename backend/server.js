const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

const turfRoutes = require("./routes/turfRoutes")
const bookingRoutes = require("./routes/bookingRoutes")

app.use("/api/turfs", turfRoutes)
app.use("/api/bookings", bookingRoutes)

app.get("/", (req,res)=>{
res.send("API Running")
})

app.listen(5000,()=>{
console.log("Server running on port 5000")
})
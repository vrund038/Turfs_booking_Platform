const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

const turfRoutes = require("./routes/turfRoutes")
const bookingRoutes = require("./routes/bookingRoutes")
const authRoutes = require("./routes/authRoutes")

app.use("/api/turfs", turfRoutes)
app.use("/api/bookings", bookingRoutes)
app.use("/api/auth", authRoutes)

app.get("/", (req,res)=>{
res.send("API Running")
})

app.listen(5000,()=>{
console.log("Server running on port 5000")
})
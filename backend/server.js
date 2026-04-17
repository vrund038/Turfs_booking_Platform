require("dotenv").config()
const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

const turfRoutes = require("./routes/turfRoutes")
const bookingRoutes = require("./routes/bookingRoutes")
const authRoutes = require("./routes/authRoutes")
const paymentRoutes = require("./routes/paymentRoutes")
const tournamentRoutes = require("./routes/tournamentRoutes")
const teamRoutes = require("./routes/teamRoutes")
const matchRoutes = require("./routes/matchRoutes")
const playerRoutes = require("./routes/playerRoutes")
const playerStatsRoutes = require("./routes/playerStatsRoutes")
const adminRoutes = require("./routes/adminRoutes")

app.use("/api/turfs", turfRoutes)
app.use("/api/bookings", bookingRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/payment", paymentRoutes)
app.use("/api/tournaments", tournamentRoutes)
app.use("/api/teams", teamRoutes)
app.use("/api/matches", matchRoutes)
app.use("/api/players", playerRoutes)
app.use("/api/player-stats", playerStatsRoutes)
app.use("/api/admin", adminRoutes)

app.get("/", (req,res)=>{
res.send("API Running")
})

app.listen(5000,()=>{
console.log("Server running on port 5000")
})
const express = require("express")
const router = express.Router()

const { createBooking,getBookedSlots } = require("../controllers/bookingController")

router.post("/", createBooking)
router.get("/", getBookedSlots)

module.exports = router
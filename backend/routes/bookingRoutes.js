const express = require("express")
const router = express.Router()

const {
createBooking,
getBookings,
getAllBookings,
deleteBooking
} = require("../controllers/bookingController")

router.post("/", createBooking)
router.get("/", getBookings)
router.get("/all", getAllBookings)
router.delete("/:id", deleteBooking)

module.exports = router
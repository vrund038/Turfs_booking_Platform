const pool = require("../config/db")

// Create Booking

const createBooking = async(req,res)=>{

const { turf_id, booking_date, time_slot, user_id } = req.body

const booking = await pool.query(
`INSERT INTO bookings(turf_id, booking_date, time_slot, user_id)
VALUES($1,$2,$3,$4)
RETURNING *`,
[turf_id, booking_date, time_slot, user_id]
)

res.json(booking.rows[0])

}


// Get bookings (for slot blocking)

const getBookings = async(req,res)=>{

const { turf_id, date } = req.query

const bookings = await pool.query(
`SELECT * FROM bookings 
WHERE turf_id=$1 AND booking_date=$2`,
[turf_id, date]
)

res.json(bookings.rows)

}

module.exports = {
createBooking,
getBookings
}
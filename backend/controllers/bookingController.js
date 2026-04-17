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

const getAllBookings = async(req,res)=>{

const bookings = await pool.query(
`SELECT b.*, t.name as turf_name 
FROM bookings b
JOIN turfs t ON b.turf_id = t.id
ORDER BY b.id DESC`
)

res.json(bookings.rows)

}


const deleteBooking = async(req,res)=>{

const { id } = req.params

await pool.query(
"DELETE FROM bookings WHERE id=$1",
[id]
)

res.json("Booking Deleted")

}

module.exports = {
createBooking,
getBookings,
getAllBookings,
deleteBooking
}
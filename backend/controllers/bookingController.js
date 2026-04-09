const pool = require("../config/db")

const createBooking = async (req,res)=>{

try{

const { user_id, turf_id, booking_date, time_slot } = req.body

const booking = await pool.query(
`INSERT INTO bookings
(user_id, turf_id, booking_date, time_slot, payment_status)
VALUES ($1,$2,$3,$4,$5)
RETURNING *`,
[user_id, turf_id, booking_date, time_slot, "pending"]
)

res.json(booking.rows[0])

}catch(error){

console.log(error)

}

}

module.exports = {
createBooking
}
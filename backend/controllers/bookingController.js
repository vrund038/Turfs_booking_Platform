const createBooking = async (req,res)=>{

try{

const { user_id, turf_id, booking_date, time_slot } = req.body

// check existing booking

const existing = await pool.query(
`SELECT * FROM bookings
WHERE turf_id=$1
AND booking_date=$2
AND time_slot=$3`,
[turf_id, booking_date, time_slot]
)

if(existing.rows.length > 0){
return res.json({message:"Slot already booked"})
}

// create booking

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


const getBookedSlots = async(req,res)=>{

const { turf_id, date } = req.query

const slots = await pool.query(
`SELECT time_slot 
FROM bookings 
WHERE turf_id=$1 
AND booking_date=$2`,
[turf_id,date]
)

res.json(slots.rows)

}


module.exports = {
createBooking,
getBookedSlots
}
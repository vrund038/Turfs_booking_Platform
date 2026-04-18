const pool = require("../config/db")

const getUserAnalytics = async(req,res)=>{

const { user_id } = req.params

// Total bookings
const total = await pool.query(
"SELECT COUNT(*) FROM bookings WHERE user_id=$1",
[user_id]
)

// Total spent
const spent = await pool.query(
"SELECT COUNT(*) * 500 AS total FROM bookings WHERE user_id=$1",
[user_id]
)

// Favorite turf
const fav = await pool.query(
`SELECT t.name, COUNT(b.id) as total
FROM bookings b
JOIN turfs t ON b.turf_id = t.id
WHERE b.user_id=$1
GROUP BY t.name
ORDER BY total DESC
LIMIT 1`,
[user_id]
)

// Activity chart
const daily = await pool.query(
`SELECT booking_date AS date, COUNT(*) 
FROM bookings 
WHERE user_id=$1
GROUP BY booking_date
ORDER BY booking_date`,
[user_id]
)

res.json({
totalBookings: total.rows[0].count,
totalSpent: spent.rows[0].total,
favorite: fav.rows[0],
daily: daily.rows
})

}

module.exports = { getUserAnalytics }
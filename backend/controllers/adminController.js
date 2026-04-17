const pool = require("../config/db")

const getAdminStats = async(req,res)=>{

const turfs = await pool.query("SELECT COUNT(*) FROM turfs")
const bookings = await pool.query("SELECT COUNT(*) FROM bookings")
const users = await pool.query("SELECT COUNT(*) FROM users")

res.json({
turfs: turfs.rows[0].count,
bookings: bookings.rows[0].count,
users: users.rows[0].count
})

}

module.exports = { getAdminStats }
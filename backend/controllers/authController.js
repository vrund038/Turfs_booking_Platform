const pool = require("../config/db")
const jwt = require("jsonwebtoken")

// LOGIN
const login = async(req,res)=>{

const { email, password } = req.body

const user = await pool.query(
"SELECT * FROM users WHERE email=$1 AND password=$2",
[email, password]
)

if(user.rows.length === 0){
return res.status(400).json("Invalid credentials")
}

const u = user.rows[0]

// ✅ IMPORTANT: include role in token
const token = jwt.sign(
{ id: u.id, role: u.role },
"secretkey"
)

res.json({
token,
user: {
id: u.id,
name: u.name,
email: u.email,
role: u.role
}
})

}


// REGISTER
const register = async(req,res)=>{

const { name, email, password } = req.body

await pool.query(
"INSERT INTO users(name,email,password,role) VALUES($1,$2,$3,'user')",
[name,email,password]
)

res.json("User Registered")

}


// ✅ GET ALL USERS (ADMIN)
const getUsers = async(req,res)=>{

const users = await pool.query(
"SELECT id, name, email, role FROM users ORDER BY id DESC"
)

res.json(users.rows)

}


// ✅ DELETE USER
const deleteUser = async(req,res)=>{

const { id } = req.params

await pool.query(
"DELETE FROM users WHERE id=$1",
[id]
)

res.json("User Deleted")

}


// EXPORT ALL
module.exports = {
login,
register,
getUsers,
deleteUser
}
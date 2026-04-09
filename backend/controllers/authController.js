const pool = require("../config/db")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// Register

const registerUser = async (req,res)=>{

try{

const { name,email,phone,password } = req.body

const hashedPassword = await bcrypt.hash(password,10)

const user = await pool.query(
`INSERT INTO users(name,email,phone,password)
VALUES($1,$2,$3,$4)
RETURNING *`,
[name,email,phone,hashedPassword]
)

res.json(user.rows[0])

}catch(error){

console.log(error)

}

}


// Login

const loginUser = async (req,res)=>{

try{

const { email,password } = req.body

const user = await pool.query(
"SELECT * FROM users WHERE email=$1",
[email]
)

if(user.rows.length === 0){
return res.json({message:"User not found"})
}

const validPassword = await bcrypt.compare(
password,
user.rows[0].password
)

if(!validPassword){
return res.json({message:"Invalid Password"})
}

const token = jwt.sign(
{id:user.rows[0].id},
"secretkey"
)

res.json({
token,
user:user.rows[0]
})

}catch(error){

console.log(error)

}

}

module.exports = {
registerUser,
loginUser
}
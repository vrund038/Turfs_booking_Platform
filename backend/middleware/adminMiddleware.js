const jwt = require("jsonwebtoken")

const adminAuth = (req,res,next)=>{

const authHeader = req.headers.authorization

if(!authHeader){
return res.status(401).json("No token")
}

// ✅ FIX HERE
const token = authHeader.split(" ")[1]

try{

const decoded = jwt.verify(token,"secretkey")

if(decoded.role !== "admin"){
return res.status(403).json("Admin only")
}

req.user = decoded
next()

}catch(error){

return res.status(401).json("Invalid token")

}

}

module.exports = adminAuth
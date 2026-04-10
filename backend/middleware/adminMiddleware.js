const jwt = require("jsonwebtoken")

const adminAuth = (req,res,next)=>{

const token = req.headers.authorization

if(!token){
return res.status(401).json("No token")
}

try{

const decoded = jwt.verify(token,"secretkey")

if(decoded.role !== "admin"){
return res.status(403).json("Admin only")
}

next()

}catch(error){

res.status(401).json("Invalid token")

}

}

module.exports = adminAuth
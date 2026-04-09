const express = require("express")
const router = express.Router()

const { createOrder } = require("../controllers/paymentController")

router.post("/create-order", createOrder)

// router.post("/create-order",(req,res)=>{
// console.log("Payment API hit")
// res.json({message:"working"})
// })    for testing

module.exports = router
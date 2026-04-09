require("dotenv").config()

const Razorpay = require("razorpay")

const razorpay = new Razorpay({
key_id: process.env.RAZORPAY_KEY_ID,
key_secret: process.env.RAZORPAY_KEY_SECRET
})

const createOrder = async (req,res)=>{

try{

const { amount } = req.body

const options = {
amount: amount * 100,
currency: "INR",
receipt: "receipt_order"
}

const order = await razorpay.orders.create(options)

res.json(order)

}catch(error){
console.log(error)
}

}

module.exports = {
createOrder
}
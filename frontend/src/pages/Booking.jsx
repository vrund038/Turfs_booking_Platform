import React, { useState, useEffect } from 'react'
import API from '../services/api'
import { useParams } from 'react-router-dom'

const Booking = () => {

const { id } = useParams()

const [date,setDate] = useState("")
const [selectedSlot,setSelectedSlot] = useState("")
const [bookedSlots,setBookedSlots] = useState([])
const [loading,setLoading] = useState(false)

const user = JSON.parse(localStorage.getItem("user"))?.user

// 🕒 Time Slots
const timeSlots = [
"6 AM - 7 AM",
"7 AM - 8 AM",
"8 AM - 9 AM",
"9 AM - 10 AM",
"10 AM - 11 AM",
"5 PM - 6 PM",
"6 PM - 7 PM",
"7 PM - 8 PM"
]

// 🔥 Fetch booked slots
useEffect(()=>{
if(date){
fetchBookedSlots()
}
},[date])

const fetchBookedSlots = async ()=>{
const res = await API.get(`/bookings?turf_id=${id}&date=${date}`)
setBookedSlots(res.data.map(b => b.time_slot))
}

// ⚡ LIVE REFRESH EVERY 5 SEC
useEffect(()=>{
if(!date) return

const interval = setInterval(()=>{
fetchBookedSlots()
},5000)

return ()=> clearInterval(interval)

},[date])

// 💰 Dynamic Price Logic
const getDynamicPrice = () => {

if(!date) return 0

const day = new Date(date).getDay()

// Weekend pricing
if(day === 0 || day === 6){
return 700
}

return 500
}

// 🚀 Booking Logic
const handleBooking = async ()=>{

if(!date || !selectedSlot){
alert("Select date and slot")
return
}

if(bookedSlots.includes(selectedSlot)){
alert("Slot already booked")
return
}

setLoading(true)

const order = await API.post("/payment/create-order",{
amount: getDynamicPrice() * 100
})

const options = {

key: "rzp_test_SbSycldtbWv6CV",
amount: order.data.amount,
currency: "INR",
order_id: order.data.id,

handler: async function(){

await API.post("/bookings",{
turf_id:id,
date,
time_slot:selectedSlot,
user_name:user?.name
})

alert("Booking Confirmed ✅")

setSelectedSlot("")
fetchBookedSlots()
setLoading(false)
}

}

const razor = new window.Razorpay(options)
razor.open()
}

return (

<div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-8">

<h1 className="text-3xl font-bold mb-6">
🏏 Book Turf Slot
</h1>

{/* Date */}

<input 
type="date"
onChange={(e)=>setDate(e.target.value)}
className="border p-2 mb-6 rounded"
/>

{/* Slots */}

<h2 className="text-xl font-semibold mb-4">
Select Time Slot
</h2>

<div className="grid grid-cols-3 gap-4">

{timeSlots.map(slot => {

const isBooked = bookedSlots.includes(slot)
const isSelected = selectedSlot === slot

return (

<div
key={slot}
onClick={()=> !isBooked && setSelectedSlot(slot)}
className={`p-4 rounded-xl text-center cursor-pointer transition 
${isBooked ? "bg-red-400 text-white cursor-not-allowed" : 
isSelected ? "bg-blue-600 text-white scale-105" :
"bg-green-100 hover:bg-green-200"}`}
>

{slot}

</div>

)

})}

</div>

{/* Selected Slot */}

{selectedSlot && (
<p className="mt-4 text-lg font-medium">
Selected: {selectedSlot}
</p>
)}

{/* 💰 Dynamic Price */}

{date && (
<p className="mt-4 text-lg font-bold text-green-600">
Price: ₹ {getDynamicPrice()}
<span className="text-sm text-gray-500"> / slot</span>
</p>
)}

{/* Button */}

<button 
onClick={handleBooking}
disabled={loading}
className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
>

{loading ? "Processing..." : "Confirm Booking"}

</button>

</div>

)

}

export default Booking
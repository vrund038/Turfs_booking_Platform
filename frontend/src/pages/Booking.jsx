import React, { useState, useEffect } from 'react'
import API from '../services/api'
import { useParams, useNavigate } from 'react-router-dom'

const Booking = () => {

const { id } = useParams()
const navigate = useNavigate()

const [date,setDate] = useState("")
const [time,setTime] = useState("")
const [bookedSlots,setBookedSlots] = useState([])
const [loading,setLoading] = useState(false)
const [error,setError] = useState("")

const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user")) || null
  } catch {
    return null
  }
}

const data = getUser()
const user = data?.user   // ✅ FIXED


useEffect(()=>{
if(date){
fetchBookedSlots()
}
},[date])

const fetchBookedSlots = async ()=>{
const res = await API.get(`/bookings?turf_id=${id}&date=${date}`)
setBookedSlots(res.data.map(b => b.time_slot))
}


const handleBooking = async ()=>{

if(!user){
setError("Please login to book turf")
return
}

if(!date || !time){
setError("Select date and time")
return
}

if(bookedSlots.includes(time)){
setError("Slot already booked")
return
}

setError("")
setLoading(true)

const order = await API.post("/payment/create-order",{ amount:500 })

const options = {

key: "rzp_test_SbSycldtbWv6CV",
amount: order.data.amount,
currency: "INR",
order_id: order.data.id,

handler: async function(){

await API.post("/bookings",{
user_id:user.id,
turf_id:id,
booking_date:date,
time_slot:time
})

navigate("/success")

}

}

const razor = new window.Razorpay(options)
razor.open()

}


return (

<div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex justify-center items-center">

<div className="bg-white p-8 rounded-2xl shadow-lg w-[400px]">

<h2 className="text-2xl font-bold mb-4">📅 Book Turf</h2>

{error && (
<div className="bg-red-100 text-red-600 p-2 mb-3 rounded">
{error}
</div>
)}

<input 
type="date"
onChange={(e)=>setDate(e.target.value)}
className="border p-2 w-full mb-4 rounded"
/>

<select 
onChange={(e)=>setTime(e.target.value)}
className="border p-2 w-full mb-4 rounded"
>

<option value="">Select Time</option>

{["6 AM - 7 AM","7 AM - 8 AM","8 AM - 9 AM"].map(slot=>{

const isBooked = bookedSlots.includes(slot)

return (
<option key={slot} value={slot} disabled={isBooked}>
{slot} {isBooked ? "(Booked)" : ""}
</option>
)

})}

</select>

<button 
onClick={handleBooking}
className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-2 rounded-lg"
>
{loading ? "Processing..." : "Confirm Booking"}
</button>

</div>

</div>

)

}

export default Booking
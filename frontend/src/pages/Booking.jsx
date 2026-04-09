import React, { useState } from 'react'
import API from '../services/api'
import { useParams } from 'react-router-dom'

const Booking = () => {

const { id } = useParams()

const [date,setDate] = useState("")
const [time,setTime] = useState("")
const user = JSON.parse(localStorage.getItem("user"))

const handleBooking = async ()=>{

await API.post("/bookings",{
user_id:user.id,
turf_id:id,
booking_date:date,
time_slot:time
})

alert("Booking Created")

}

return (

<div className="p-4">

<h2 className="text-xl font-bold">
Book Slot
</h2>

<input 
type="date"
onChange={(e)=>setDate(e.target.value)}
className="border p-2 mt-2"
/>

<select 
onChange={(e)=>setTime(e.target.value)}
className="border p-2 mt-2"
>

<option>Select Time</option>

<option>6 AM - 7 AM</option>
<option>7 AM - 8 AM</option>
<option>8 AM - 9 AM</option>

</select>

<button 
onClick={handleBooking}
className="bg-blue-500 text-white px-4 py-2 mt-3"
>

Confirm Booking

</button>

</div>

)

}

export default Booking
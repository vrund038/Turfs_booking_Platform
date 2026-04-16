import React from "react"
import { useNavigate } from "react-router-dom"

const BookingSuccess = () => {

const navigate = useNavigate()

return (

<div className="flex flex-col items-center justify-center h-screen bg-gray-100">

<h2 className="text-3xl font-bold text-green-600">
🎉 Booking Confirmed!
</h2>

<p className="text-gray-600 mt-2">
Your turf has been successfully booked.
</p>

<button
onClick={()=>navigate("/")}
className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
>
Go to Home
</button>

</div>

)

}

export default BookingSuccess
import React from 'react'
import { useNavigate } from 'react-router-dom'

const TurfCard = ({turf}) => {

const navigate = useNavigate()

return (

<div className="border p-4 rounded-lg shadow-md">

<h2 className="text-xl font-bold">{turf.name}</h2>

<p>{turf.location}</p>

<p className="text-green-600 font-bold">
₹{turf.price_per_hour} / hour
</p>

<button 
onClick={()=>navigate(`/turf/${turf.id}`)}
className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
>

Book Now

</button>

</div>

)

}

export default TurfCard
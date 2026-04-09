import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import API from '../services/api'

const TurfDetails = () => {

const { id } = useParams()
const navigate = useNavigate()

const [turf,setTurf] = useState({})

useEffect(()=>{
fetchTurf()
},[])

const fetchTurf = async ()=>{
const res = await API.get(`/turfs/${id}`)
setTurf(res.data)
}

return (

<div className="p-4">

<h1 className="text-2xl font-bold">
{turf.name}
</h1>

<p>{turf.location}</p>

<p className="text-green-600">
₹{turf.price_per_hour}
</p>

<button 
onClick={()=>navigate(`/booking/${turf.id}`)}
className="bg-green-500 text-white px-4 py-2 mt-3"
>

Select Slot

</button>

</div>

)

}

export default TurfDetails
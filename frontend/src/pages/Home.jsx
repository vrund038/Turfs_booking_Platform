import React, { useEffect, useState } from 'react'
import API from '../services/api'
import { useNavigate } from 'react-router-dom'

const Home = () => {

const [turfs,setTurfs] = useState([])
const [loading,setLoading] = useState(true)

const navigate = useNavigate()

useEffect(()=>{
fetchTurfs()
},[])

const fetchTurfs = async ()=>{
const res = await API.get("/turfs")
setTurfs(res.data)
setLoading(false)
}

return (

<div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">

<h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
🏟️ Explore Turfs
</h1>

{loading ? (
<p className="text-gray-500">Loading turfs...</p>
) : turfs.length === 0 ? (
<p className="text-gray-500">No turfs available</p>
) : (

<div className="grid grid-cols-3 gap-8">

{turfs.map(t=>(
<div 
key={t.id}
className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition duration-300"
>

<img 
src={t.image}
className="h-44 w-full object-cover"
/>

<div className="p-4">

<h2 className="text-xl font-bold">{t.name}</h2>

<p className="text-gray-500 text-sm mt-1">
📍 {t.location}
</p>

<p className="mt-2 text-lg font-bold text-green-600">
₹ {t.price_per_hour || 0}
<span className="text-sm text-gray-500"> / hour</span>
</p>

<button
onClick={()=>navigate(`/booking/${t.id}`)}
className="w-full mt-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-2 rounded-lg hover:opacity-90"
>
Book Now
</button>

</div>

</div>
))}

</div>

)}

</div>

)

}

export default Home
import React, { useEffect, useState } from 'react'
import API from '../services/api'
import { useNavigate } from "react-router-dom"

const Tournament = () => {

const navigate = useNavigate()

const [name,setName] = useState("")
const [location,setLocation] = useState("")
const [date,setDate] = useState("")
const [fee,setFee] = useState("")

const [tournaments,setTournaments] = useState([])

useEffect(()=>{
fetchTournaments()
},[])

const fetchTournaments = async ()=>{
const res = await API.get("/tournaments")
setTournaments(res.data)
}

const handleCreate = async ()=>{

await API.post("/tournaments",{
name,
location,
start_date:date,
entry_fee:fee,
created_by:1
})

alert("Tournament Created")

fetchTournaments()

}

return (

<div className="p-6">

<h1 className="text-2xl font-bold mb-4">
Tournament Section
</h1>

{/* Create Tournament */}

<div className="border p-4 rounded mb-6">

<h2 className="text-xl font-semibold mb-3">
Create Tournament
</h2>

<input
placeholder="Tournament Name"
className="border p-2 block mb-2 w-full"
onChange={(e)=>setName(e.target.value)}
/>

<input
placeholder="Location"
className="border p-2 block mb-2 w-full"
onChange={(e)=>setLocation(e.target.value)}
/>

<input
type="date"
className="border p-2 block mb-2 w-full"
onChange={(e)=>setDate(e.target.value)}
/>

<input
placeholder="Entry Fee"
className="border p-2 block mb-2 w-full"
onChange={(e)=>setFee(e.target.value)}
/>

<button 
onClick={handleCreate}
className="bg-blue-500 text-white px-4 py-2 rounded"
>
Create Tournament
</button>

</div>

{/* Tournament List */}

<h2 className="text-xl font-semibold mb-3">
All Tournaments
</h2>

<div className="grid grid-cols-3 gap-4">

{
tournaments.map(t=>(
<div 
key={t.id}
className="border p-4 rounded shadow"
>

<h3 className="text-lg font-bold">
{t.name}
</h3>

<p>📍 {t.location}</p>
<p>📅 {t.start_date}</p>
<p>💰 ₹{t.entry_fee}</p>

<div className="mt-3 space-x-2">

<button
onClick={()=>navigate(`/register-team/${t.id}`)}
className="bg-green-500 text-white px-3 py-1 rounded"
>
Register Team
</button>

<button
onClick={()=>navigate(`/tournament/${t.id}`)}
className="bg-gray-700 text-white px-3 py-1 rounded"
>
View Teams
</button>

</div>

</div>
))
}

</div>

</div>

)

}

export default Tournament
import React, { useState, useEffect } from 'react'
import API from '../services/api'

const Tournament = () => {

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

console.log("Button Clicked")

try{

console.log("Sending API Request")

const res = await API.post("/tournaments",{
name,
location,
start_date:date,
entry_fee:fee,
created_by:1
})

console.log("Response:",res)

alert("Tournament Created")

fetchTournaments()
}catch(error){
console.log("Error creating tournament:",error)
alert("Failed to create tournament")
}
}

return (

<div className="p-6 max-w-5xl mx-auto">

{/* Page Title */}

<h1 className="text-3xl font-bold mb-6">
🏆 Tournament Management
</h1>


{/* Create Tournament Card */}

<div className="bg-white shadow-md rounded-lg p-6 mb-8">

<h2 className="text-xl font-semibold mb-4">
Create Tournament
</h2>

<div className="grid grid-cols-2 gap-4">

<input
className="border p-2 rounded"
placeholder="Tournament Name"
onChange={(e)=>setName(e.target.value)}
/>

<input
className="border p-2 rounded"
placeholder="Location"
onChange={(e)=>setLocation(e.target.value)}
/>

<input
type="date"
className="border p-2 rounded"
onChange={(e)=>setDate(e.target.value)}
/>

<input
className="border p-2 rounded"
placeholder="Entry Fee"
onChange={(e)=>setFee(e.target.value)}
/>

</div>

<button 
type="button"
onClick={() => handleCreate()}
className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
>
Create Tournament
</button>



</div>


{/* Tournament List */}

<div>

<h2 className="text-xl font-semibold mb-4">
All Tournaments
</h2>

<div className="grid grid-cols-2 gap-4">

{
tournaments.map(t=>(
<div 
key={t.id}
className="border p-4 rounded shadow-sm bg-white"
>

<h3 className="text-lg font-bold">
{t.name}
</h3>

<p className="text-gray-600">
📍 {t.location}
</p>

<p className="text-gray-600">
📅 {t.start_date}
</p>

<p className="text-green-600 font-semibold">
₹ {t.entry_fee}
</p>

</div>
))
}

</div>

</div>

</div>

)

}

export default Tournament
import React, { useEffect, useState } from 'react'
import API from '../services/api'
import { useParams } from 'react-router-dom'

const TeamPlayers = () => {

const { id } = useParams()

const [players,setPlayers] = useState([])
const [name,setName] = useState("")
const [role,setRole] = useState("")

useEffect(()=>{
fetchPlayers()
},[])


// Fetch Players

const fetchPlayers = async ()=>{
const res = await API.get(`/players/${id}`)
setPlayers(res.data)
}


// Add Player (with validation)

const addPlayer = async ()=>{

if(!name || !role){
alert("Please fill all fields")
return
}

await API.post("/players",{
name,
role,
team_id:id
})

setName("")
setRole("")
fetchPlayers()

}


// Delete Player

const deletePlayer = async(playerId)=>{

const confirmDelete = window.confirm("Are you sure to delete player?")

if(!confirmDelete) return

await API.delete(`/players/${playerId}`)

fetchPlayers()

}


return (

<div className="p-8 bg-gray-100 min-h-screen">

{/* Header */}

<div className="mb-6">

<h1 className="text-3xl font-bold">
👥 Team Players
</h1>

<p className="text-gray-500">
Manage your team squad
</p>

</div>


{/* Add Player Section */}

<div className="bg-white p-6 rounded-xl shadow mb-6">

<h2 className="text-xl font-semibold mb-4">
Add Player
</h2>

<div className="grid grid-cols-3 gap-4">

<input
placeholder="Player Name"
className="border p-3 rounded focus:outline-blue-400"
value={name}
onChange={(e)=>setName(e.target.value)}
/>

<select
className="border p-3 rounded"
value={role}
onChange={(e)=>setRole(e.target.value)}
>

<option value="">Select Role</option>
<option value="Batsman">Batsman</option>
<option value="Bowler">Bowler</option>
<option value="All-Rounder">All-Rounder</option>
<option value="Wicket-Keeper">Wicket Keeper</option>

</select>

<button
onClick={addPlayer}
className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
>
Add Player
</button>

</div>

</div>


{/* Players List */}

<h2 className="text-xl font-semibold mb-4">
Squad
</h2>

<div className="grid grid-cols-3 gap-5">

{
players.map(p=>(
<div 
key={p.id} 
className="bg-white p-5 rounded-xl shadow hover:shadow-xl transition"
>

<h3 className="font-bold text-lg">
🏏 {p.name}
</h3>

<p className="text-gray-500 mt-1">
Role: {p.role}
</p>


{/* Role Badge */}

<div className="mt-2 mb-3">

<span className={`px-3 py-1 rounded text-sm font-semibold
${p.role === "Batsman" && "bg-blue-100 text-blue-700"}
${p.role === "Bowler" && "bg-green-100 text-green-700"}
${p.role === "All-Rounder" && "bg-purple-100 text-purple-700"}
${p.role === "Wicket-Keeper" && "bg-yellow-100 text-yellow-700"}
`}>

{p.role}

</span>

</div>


{/* Delete Button */}

<button
onClick={()=>deletePlayer(p.id)}
className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
>
Delete
</button>

</div>
))
}

</div>

</div>

)

}

export default TeamPlayers
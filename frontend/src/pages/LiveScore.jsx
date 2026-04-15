import React, { useState } from 'react'
import API from '../services/api'
import { useParams, useNavigate } from 'react-router-dom'

const LiveScore = () => {

const { id } = useParams()
const navigate = useNavigate()

const [runs,setRuns] = useState("")
const [wickets,setWickets] = useState("")
const [overs,setOvers] = useState("")
const [battingTeam,setBattingTeam] = useState("")
const [innings,setInnings] = useState(1)

const updateScore = async ()=>{

await API.put(`/matches/live/${id}`,{

batting_team:battingTeam,
runs,
wickets,
overs,
innings

})

alert("Live Score Updated")

}

const completeMatch = async ()=>{

await API.put(`/matches/live/${id}`,{
innings:2
})

alert("Match Completed")

navigate(-1)

}

return (

<div className="min-h-screen bg-gray-100 p-8">

{/* Header */}

<div className="mb-6">

<h1 className="text-3xl font-bold">
🏏 Live Match Scoring
</h1>

<p className="text-gray-500">
Update match score in real time
</p>

</div>


{/* Scoreboard */}

<div className="bg-white p-6 rounded-xl shadow mb-6">

<h2 className="text-xl font-semibold mb-4">
Live Scoreboard
</h2>

<p className="text-3xl font-bold text-blue-600">
{runs || 0}/{wickets || 0}
</p>

<p className="text-gray-500">
Overs: {overs || "0.0"}
</p>

<p className="text-green-600 mt-2">
Innings: {innings}
</p>

</div>


{/* Scoring Form */}

<div className="bg-white p-6 rounded-xl shadow">

<div className="grid grid-cols-2 gap-4">

<input
placeholder="Runs"
className="border p-3 rounded"
onChange={(e)=>setRuns(e.target.value)}
/>

<input
placeholder="Wickets"
className="border p-3 rounded"
onChange={(e)=>setWickets(e.target.value)}
/>

<input
placeholder="Overs"
className="border p-3 rounded"
onChange={(e)=>setOvers(e.target.value)}
/>

<select
className="border p-3 rounded"
onChange={(e)=>setBattingTeam(e.target.value)}
>

<option>Select Batting Team</option>
<option value="1">Team 1</option>
<option value="2">Team 2</option>

</select>

<select
className="border p-3 rounded"
onChange={(e)=>setInnings(e.target.value)}
>

<option value="1">1st Innings</option>
<option value="2">2nd Innings</option>

</select>

</div>


{/* Buttons */}

<div className="mt-6 flex gap-3">

<button
onClick={updateScore}
className="bg-green-500 text-white px-6 py-2 rounded"
>

Update Score

</button>

<button
onClick={completeMatch}
className="bg-yellow-500 text-white px-6 py-2 rounded"
>

Complete Match

</button>

</div>

</div>

</div>

)

}

export default LiveScore
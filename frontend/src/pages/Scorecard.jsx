import React, { useEffect, useState } from 'react'
import API from '../services/api'
import { useParams } from 'react-router-dom'

const Scorecard = () => {

const { id } = useParams()

const [stats,setStats] = useState([])
const [players,setPlayers] = useState([])
const [match,setMatch] = useState(null)

const [selectedPlayer,setSelectedPlayer] = useState("")
const [runs,setRuns] = useState("")
const [wickets,setWickets] = useState("")

useEffect(()=>{
fetchMatch()
fetchStats()
},[])


// Fetch Match + Players

const fetchMatch = async ()=>{

const res = await API.get(`/matches/single/${id}`)
const matchData = res.data[0]

setMatch(matchData)

// ✅ Safety check

if(!matchData.team1_id || !matchData.team2_id){
console.log("Invalid team ids", matchData)
return
}

// Fetch players

const team1Players = await API.get(`/players/${matchData.team1_id}`)
const team2Players = await API.get(`/players/${matchData.team2_id}`)

setPlayers([...team1Players.data, ...team2Players.data])

}


// Fetch Stats

const fetchStats = async ()=>{
const res = await API.get(`/player-stats/${id}`)
setStats(res.data)
}


// Add / Update Stats

const addStats = async ()=>{

if(!selectedPlayer){
alert("Select player")
return
}

await API.post("/player-stats",{
player_id:selectedPlayer,
match_id:id,
runs,
wickets
})

setRuns("")
setWickets("")
fetchStats()

}


return (

<div className="p-8 bg-gray-100 min-h-screen">

<h1 className="text-2xl font-bold mb-4">
📊 Match Scorecard
</h1>


{/* Match Info */}

{match && (
<div className="bg-white p-4 rounded shadow mb-6">

<h2 className="font-bold text-lg">
{match.team1} vs {match.team2}
</h2>

</div>
)}


{/* Add Stats */}

<div className="bg-white p-5 rounded shadow mb-6">

<select
className="border p-2 mr-2"
value={selectedPlayer}
onChange={(e)=>setSelectedPlayer(e.target.value)}
>

<option value="">Select Player</option>

{
players.map(p=>(
<option key={p.id} value={p.id}>
{p.name}
</option>
))
}

</select>

<input
placeholder="Runs"
className="border p-2 mr-2"
value={runs}
onChange={(e)=>setRuns(e.target.value)}
/>

<input
placeholder="Wickets"
className="border p-2 mr-2"
value={wickets}
onChange={(e)=>setWickets(e.target.value)}
/>

<button
onClick={addStats}
className="bg-blue-500 text-white px-4 py-2"
>
Save Stats
</button>

</div>


{/* Stats List */}

<div className="bg-white rounded shadow">

{
stats.map((s)=>(
<div key={s.player_id} className="flex justify-between p-4 border-b">

<span>{s.name}</span>

<span>
Runs: {s.runs} | Wickets: {s.wickets}
</span>

</div>
))
}

</div>

</div>

)

}

export default Scorecard
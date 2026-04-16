import React, { useEffect, useState } from 'react'
import API from '../services/api'
import { useParams, useNavigate } from 'react-router-dom'

const TournamentDetails = () => {

const { id } = useParams()
const navigate = useNavigate()

const [teams,setTeams] = useState([])
const [matches,setMatches] = useState([])
const [points,setPoints] = useState([])
const [winner,setWinner] = useState(null)
const [stats,setStats] = useState([])

useEffect(()=>{
fetchTeams()
fetchMatches()
fetchPoints()
fetchWinner()
fetchStats()
},[])

const fetchTeams = async ()=>{
const res = await API.get(`/teams/${id}`)
setTeams(res.data)
}

const fetchMatches = async ()=>{
const res = await API.get(`/matches/${id}`)
setMatches(res.data)
}

const fetchPoints = async ()=>{
const res = await API.get(`/matches/points/${id}`)
setPoints(res.data)
}

const fetchWinner = async ()=>{
const res = await API.get(`/matches/winner/${id}`)
setWinner(res.data)
}

const fetchStats = async ()=>{
const res = await API.get("/player-stats/tournament-stats/all")
setStats(res.data)
}


// Calculations

const topBatsman = [...stats].sort((a,b)=>b.total_runs - a.total_runs)[0]
const topBowler = [...stats].sort((a,b)=>b.total_wickets - a.total_wickets)[0]

const mvp = [...stats].sort(
(a,b)=>(b.total_runs + b.total_wickets*20) - (a.total_runs + a.total_wickets*20)
)[0]


return (

<div className="p-8 bg-gray-100 min-h-screen">

{/* Header */}

<div className="mb-6 flex justify-between">

<div>
<h1 className="text-3xl font-bold">🏆 Tournament Details</h1>
<p className="text-gray-500">Manage matches & analytics</p>
</div>

<button
onClick={()=>navigate(`/analytics/${id}`)}
className="bg-black text-white px-4 py-2 rounded"
>
📊 Analytics
</button>

</div>


{/* 🔥 Highlights */}

<h2 className="text-xl font-semibold mt-4 mb-3">
📊 Tournament Highlights
</h2>

<div className="grid grid-cols-3 gap-5">

<div className="bg-white p-5 rounded-xl shadow">
<h3 className="font-bold text-lg">🏏 Top Batsman</h3>
<p className="text-xl mt-2">{topBatsman?.name}</p>
<p className="text-gray-500">Runs: {topBatsman?.total_runs}</p>
<p className="text-sm text-green-600">
50s: {topBatsman?.fifties} | 100s: {topBatsman?.hundreds}
</p>
</div>

<div className="bg-white p-5 rounded-xl shadow">
<h3 className="font-bold text-lg">🎯 Top Bowler</h3>
<p className="text-xl mt-2">{topBowler?.name}</p>
<p className="text-gray-500">Wickets: {topBowler?.total_wickets}</p>
</div>

<div className="bg-yellow-100 p-5 rounded-xl shadow">
<h3 className="font-bold text-lg">🏆 MVP</h3>
<p className="text-xl mt-2">{mvp?.name}</p>
<p className="text-sm text-gray-600">Impact Player</p>
</div>

</div>


{/* Teams */}

<h2 className="text-xl font-semibold mt-8 mb-3">Teams</h2>

<div className="grid grid-cols-4 gap-4">
{teams.map(team=>(
<div key={team.id} className="bg-white p-4 rounded shadow">
🏏 {team.team_name}

<button
onClick={()=>navigate(`/team/${team.id}`)}
className="block mt-2 bg-blue-500 text-white px-2 py-1 rounded text-sm"
>
Players
</button>

</div>
))}
</div>


{/* Matches */}

<h2 className="text-xl font-semibold mt-8 mb-3">Matches</h2>

<div className="grid grid-cols-2 gap-5">

{matches.map(match=>(
<div key={match.id} className="bg-white p-5 rounded shadow">

<h3 className="font-bold">
{match.team1} vs {match.team2}
</h3>

<p className="text-lg mt-2">
{match.runs || 0}/{match.wickets || 0}
</p>

<p className="text-gray-500">
Overs: {match.overs || "0.0"}
</p>

{match.result && (
<p className="text-blue-600 mt-2">{match.result}</p>
)}

<div className="flex gap-2 mt-3">

<button
onClick={()=>navigate(`/live-score/${match.id}`)}
className="bg-red-500 text-white px-2 py-1 rounded text-sm"
>
Live
</button>

<button
onClick={()=>navigate(`/scorecard/${match.id}`)}
className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
>
Scorecard
</button>

</div>

</div>
))}

</div>


{/* Winner */}

<h2 className="text-xl mt-8">🏆 Winner</h2>

{winner && (
<div className="bg-yellow-100 p-4 mt-3 rounded shadow text-center">
🏆 {winner.team_name}
</div>
)}


{/* Points */}

<h2 className="text-xl mt-8">Points Table</h2>

<div className="bg-white mt-3 rounded shadow">

{points.map((team,index)=>(
<div key={team.team_name} className="flex justify-between p-3 border-b">
<span>#{index+1} {team.team_name}</span>
<span>{team.wins} Wins</span>
</div>
))}

</div>

</div>

)

}

export default TournamentDetails
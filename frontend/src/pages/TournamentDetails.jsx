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

useEffect(()=>{
fetchTeams()
fetchMatches()
fetchPoints()
fetchWinner()
},[])


// Fetch Teams
const fetchTeams = async ()=>{
const res = await API.get(`/teams/${id}`)
setTeams(res.data)
}


// Fetch Matches
const fetchMatches = async ()=>{
const res = await API.get(`/matches/${id}`)
setMatches(res.data)
}


// Fetch Points
const fetchPoints = async ()=>{
const res = await API.get(`/matches/points/${id}`)
setPoints(res.data)
}


// Fetch Winner
const fetchWinner = async ()=>{
const res = await API.get(`/matches/winner/${id}`)
setWinner(res.data)
}


return (

<div className="p-8 bg-gray-100 min-h-screen">

{/* Header */}

<div className="mb-6">

<h1 className="text-3xl font-bold">
🏆 Tournament Details
</h1>

<p className="text-gray-500">
Live Scoring & Tournament Management
</p>

</div>


{/* Teams Section */}

<h2 className="text-2xl font-semibold mb-4">
Teams
</h2>

<div className="grid grid-cols-4 gap-4">

{
teams.map(team=>(
<div 
key={team.id}
className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
>

🏏 {team.team_name}

</div>
))
}

</div>


{/* Matches Section */}

<h2 className="text-2xl font-semibold mt-8 mb-4">
Matches
</h2>

<div className="grid grid-cols-2 gap-5">

{
matches.map(match=>(
<div 
key={match.id}
className="bg-white p-5 rounded-xl shadow hover:shadow-xl transition"
>

<h3 className="font-bold text-lg">

{match.team1} vs {match.team2}

</h3>


{/* Live Score Display */}

<div className="mt-3 bg-gray-50 p-3 rounded">

<p className="text-lg font-semibold">

{match.runs || 0}/{match.wickets || 0}

</p>

<p className="text-gray-500 text-sm">

Overs: {match.overs || "0.0"}  
• Innings: {match.innings || 1}

</p>

<p className="text-sm text-blue-600 mt-1">

Batting: {match.batting_team === 1 ? match.team1 :
match.batting_team === 2 ? match.team2 :
"Not Started"}

</p>

</div>


{/* Buttons */}

<div className="flex gap-2 mt-4">

<button
onClick={()=>navigate(`/live-score/${match.id}`)}
className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
>

Live Score

</button>

<button
onClick={()=>navigate(`/tournament-bracket/${id}`)}
className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600"
>

Bracket

</button>

</div>

</div>
))
}

</div>


{/* Winner Section */}

<h2 className="text-2xl font-semibold mt-8">
🏆 Tournament Leader
</h2>

{
winner && (

<div className="bg-yellow-100 p-5 mt-3 rounded-xl shadow animate-pulse">

<h3 className="text-xl font-bold">

🏆 {winner.team_name}

</h3>

<p className="text-gray-600">
Wins: {winner.wins}
</p>

</div>

)
}


{/* Points Table */}

<h2 className="text-2xl font-semibold mt-8">
Points Table
</h2>

<div className="bg-white rounded-xl shadow mt-3">

{
points.map((team,index)=>(
<div 
key={team.team_name}
className="flex justify-between p-4 border-b"
>

<span>

#{index+1} — {team.team_name}

</span>

<span>

Wins: {team.wins}

</span>

</div>
))
}

</div>


</div>

)

}

export default TournamentDetails
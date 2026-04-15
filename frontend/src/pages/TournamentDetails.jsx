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
Manage teams, matches & results
</p>

</div>


{/* Teams Section */}

<h2 className="text-xl font-semibold mb-3">
Teams
</h2>

<div className="grid grid-cols-4 gap-4">

{
teams.map(team=>(
<div 
key={team.id}
className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
>

<h3 className="font-bold">
🏏 {team.team_name}
</h3>

<button
onClick={()=>navigate(`/team/${team.id}`)}
className="bg-blue-500 text-white px-3 py-1 mt-2 rounded hover:bg-blue-600 text-sm"
>
View Players
</button>

</div>
))
}

</div>


{/* Matches Section */}

<h2 className="text-xl font-semibold mt-8 mb-3">
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


{/* Score */}

<div className="mt-3">

<p className="text-2xl font-bold text-blue-600">
{match.runs || 0}/{match.wickets || 0}
</p>

<p className="text-gray-500 text-sm">
Overs: {match.overs || "0.0"} • Innings: {match.innings || 1}
</p>

<p className="text-green-600 text-sm mt-1">
Batting: {match.batting_team === 1 
? match.team1 
: match.batting_team === 2 
? match.team2 
: "Not Started"}
</p>

</div>


{/* Match Completed */}

{match.match_completed && (

<div className="bg-green-100 text-green-700 p-2 mt-3 rounded text-sm font-semibold">
Match Completed
</div>

)}


{/* Match Result */}

{match.result && (

<div className="bg-blue-100 text-blue-700 p-2 mt-2 rounded font-semibold text-sm">
{match.result}
</div>

)}


{/* Buttons */}

<div className="mt-4 flex gap-2">

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


{/* Winner Card */}

<h2 className="text-xl font-semibold mt-8">
🏆 Tournament Winner
</h2>

{
winner ? (

<div className="bg-gradient-to-r from-yellow-200 to-yellow-100 p-6 mt-4 rounded-xl shadow-lg">

<h2 className="text-2xl font-bold text-center">
🏆 {winner.team_name}
</h2>

<p className="text-center text-gray-600 mt-2">
Wins: {winner.wins}
</p>

</div>

) : (

<div className="text-gray-500 mt-3">
Winner will be decided after matches complete
</div>

)
}


{/* Points Table */}

<h2 className="text-xl font-semibold mt-8">
Points Table
</h2>

<div className="bg-white mt-3 rounded-xl shadow">

{
points.map((team,index)=>(
<div 
key={team.team_name}
className="flex justify-between p-4 border-b"
>

<span>
#{index+1} {team.team_name}
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
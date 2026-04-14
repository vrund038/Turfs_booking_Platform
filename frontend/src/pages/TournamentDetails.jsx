import React, { useEffect, useState } from 'react'
import API from '../services/api'
import { useParams } from 'react-router-dom'

const TournamentDetails = () => {

const { id } = useParams()

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


// Fetch Points Table

const fetchPoints = async ()=>{

const res = await API.get(`/matches/points/${id}`)
setPoints(res.data)

}


// Fetch Winner

const fetchWinner = async ()=>{

const res = await API.get(`/matches/winner/${id}`)
setWinner(res.data)

}


// Generate Matches

const generateMatches = async ()=>{

await API.post("/matches/generate",{
tournament_id:id
})

alert("Matches Generated")

fetchMatches()

}


// Update Score

const updateScore = async(matchId)=>{

const team1_score = prompt("Enter Team 1 Score")
const team2_score = prompt("Enter Team 2 Score")

let winnerId

if(Number(team1_score) > Number(team2_score)){
winnerId = 1
}else{
winnerId = 2
}

await API.put(`/matches/${matchId}`,{
team1_score,
team2_score,
winner:winnerId
})

fetchMatches()
fetchPoints()
fetchWinner()

}


return (

<div className="p-6">

{/* Teams Section */}

<h2 className="text-2xl font-bold mb-4">
Teams
</h2>

<div className="grid grid-cols-3 gap-3">

{
teams.map(team=>(
<div 
key={team.id}
className="border p-3 rounded shadow"
>

🏏 {team.team_name}

</div>
))
}

</div>


{/* Generate Matches */}

<button
onClick={generateMatches}
className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
>

Generate Matches

</button>


{/* Matches Section */}

<h2 className="text-2xl font-bold mt-6">
Matches
</h2>

<div className="grid grid-cols-2 gap-3 mt-2">

{
matches.map(match=>(
<div 
key={match.id} 
className="border p-3 rounded shadow"
>

<h3 className="font-bold">
{match.team1} vs {match.team2}
</h3>

<p className="mt-2">
Score: {match.team1_score || 0} - {match.team2_score || 0}
</p>

<button
onClick={()=>updateScore(match.id)}
className="bg-green-500 text-white px-3 py-1 mt-2 rounded"
>

Update Score

</button>

</div>
))
}

</div>


{/* Winner Section */}

<h2 className="text-2xl font-bold mt-6">
🏆 Tournament Leader
</h2>

{
winner && (

<div className="bg-yellow-200 p-4 rounded mt-2 shadow">

🏆 {winner.team_name} — Wins: {winner.wins}

</div>

)
}


{/* Points Table */}

<h2 className="text-2xl font-bold mt-6">
Points Table
</h2>

<div className="mt-3">

{
points.map((team,index)=>(
<div 
key={team.team_name}
className="border p-3 mt-2 rounded flex justify-between"
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
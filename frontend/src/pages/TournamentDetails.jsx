import React, { useEffect, useState } from 'react'
import API from '../services/api'
import { useParams } from 'react-router-dom'

const TournamentDetails = () => {

const { id } = useParams()

const [teams,setTeams] = useState([])
const [matches,setMatches] = useState([])
const [points,setPoints] = useState([])

useEffect(()=>{
fetchTeams()
fetchMatches()
fetchPoints()
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

const generateMatches = async ()=>{

await API.post("/matches/generate",{
tournament_id:id
})

alert("Matches Generated")

fetchMatches()

}

const updateScore = async(matchId)=>{

const team1_score = prompt("Enter Team 1 Score")
const team2_score = prompt("Enter Team 2 Score")

let winner

if(team1_score > team2_score){
winner = 1
}else{
winner = 2
}

await API.put(`/matches/${matchId}`,{
team1_score,
team2_score,
winner
})

fetchMatches()
fetchPoints()

}

return (

<div className="p-6">

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

{team.team_name}

</div>
))
}

</div>

<button
onClick={generateMatches}
className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
>

Generate Matches

</button>

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

<p>
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

<h2 className="text-2xl font-bold mt-6">
Points Table
</h2>

{
points.map(team=>(
<div 
key={team.team_name}
className="border p-2 mt-2 rounded"
>

🏏 {team.team_name} — Wins: {team.wins}

</div>
))
}

</div>

)

}

export default TournamentDetails
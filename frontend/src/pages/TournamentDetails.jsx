import React, { useEffect, useState } from 'react'
import API from '../services/api'
import { useParams } from 'react-router-dom'

const TournamentDetails = () => {

const { id } = useParams()

const [teams,setTeams] = useState([])
const [matches,setMatches] = useState([])

useEffect(()=>{
fetchTeams()
fetchMatches()
},[])

const fetchTeams = async ()=>{

const res = await API.get(`/teams/${id}`)
setTeams(res.data)

}

const fetchMatches = async ()=>{

const res = await API.get(`/matches/${id}`)
setMatches(res.data)

}

const generateMatches = async ()=>{

await API.post("/matches/generate",{
tournament_id:id
})

alert("Matches Generated")

fetchMatches()

}

return (

<div className="p-6">

<h2 className="text-2xl font-bold mb-4">
Teams
</h2>

{
teams.map(team=>(
<div key={team.id}>
{team.team_name}
</div>
))
}

<button
onClick={generateMatches}
className="bg-blue-500 text-white px-4 py-2 mt-4"
>
Generate Matches
</button>

<h2 className="text-2xl font-bold mt-6">
Matches
</h2>

{
matches.map(match=>(
<div key={match.id} className="border p-2 mt-2">

{match.team1} vs {match.team2}

</div>
))
}

</div>

)

}

export default TournamentDetails
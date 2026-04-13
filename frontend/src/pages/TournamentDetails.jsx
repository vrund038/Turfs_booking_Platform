import React, { useEffect, useState } from 'react'
import API from '../services/api'
import { useParams } from 'react-router-dom'

const TournamentDetails = () => {

const { id } = useParams()

const [teams,setTeams] = useState([])

useEffect(()=>{
fetchTeams()
},[])

const fetchTeams = async ()=>{

const res = await API.get(`/teams/${id}`)
setTeams(res.data)

}

return (

<div>

<h2>Teams</h2>

{
teams.map(team=>(
<div key={team.id}>
<h3>{team.team_name}</h3>
<p>{team.captain_name}</p>
</div>
))
}

</div>

)

}

export default TournamentDetails
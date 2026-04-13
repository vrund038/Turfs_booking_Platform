import React, { useState } from 'react'
import API from '../services/api'
import { useParams } from 'react-router-dom'

const RegisterTeam = () => {

const { id } = useParams()

const [team,setTeam] = useState("")
const [captain,setCaptain] = useState("")

const handleRegister = async ()=>{

await API.post("/teams",{
team_name:team,
captain_name:captain,
tournament_id:id
})

alert("Team Registered")

}

return (

<div>

<h2>Register Team</h2>

<input
placeholder="Team Name"
onChange={(e)=>setTeam(e.target.value)}
/>

<input
placeholder="Captain Name"
onChange={(e)=>setCaptain(e.target.value)}
/>

<button onClick={handleRegister}>
Register Team
</button>

</div>

)

}

export default RegisterTeam
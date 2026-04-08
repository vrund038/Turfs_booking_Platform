import React, { useEffect, useState } from 'react'
import API from '../services/api'

const Home = () => {

const [turfs,setTurfs] = useState([])

useEffect(()=>{
fetchTurfs()
},[])

const fetchTurfs = async ()=>{
const res = await API.get("/turfs")
setTurfs(res.data)
}

return (

<div>

<h1>Available Turfs</h1>

{
turfs.map(turf=>(
<div key={turf.id}>

<h3>{turf.name}</h3>
<p>{turf.location}</p>
<p>₹{turf.price_per_hour}</p>

</div>
))
}

</div>

)
}

export default Home
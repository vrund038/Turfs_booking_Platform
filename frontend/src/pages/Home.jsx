import React, { useEffect, useState } from 'react'
import API from '../services/api'
import TurfCard from '../components/TurfCard'

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

<div className="grid grid-cols-3 gap-4 p-4">

{
turfs.map(turf=>(
<TurfCard key={turf.id} turf={turf}/>
))
}

</div>

)
}

export default Home
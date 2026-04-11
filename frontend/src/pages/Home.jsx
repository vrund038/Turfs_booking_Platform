import React, { useEffect, useState } from 'react'
import API from '../services/api'
import TurfCard from '../components/TurfCard'

const Home = () => {

const [turfs,setTurfs] = useState([])
const [featured,setFeatured] = useState([])

useEffect(()=>{
fetchTurfs()
fetchFeatured()
},[])

const fetchTurfs = async ()=>{
const res = await API.get("/turfs")
setTurfs(res.data)
}

const fetchFeatured = async ()=>{
const res = await API.get("/turfs/featured")
setFeatured(res.data)
}

const handleFeatured = async (id)=>{

await API.put(`/turfs/featured/${id}`)

fetchFeatured()

}

return (

<div className="p-4">

{/* Featured Section */}

<h2 className="text-2xl font-bold mb-4">
⭐ Featured Turfs
</h2>

<div className="grid grid-cols-3 gap-4 mb-8">

{
featured.map(turf=>(
<TurfCard key={turf.id} turf={turf}/>
))
}

</div>


{/* All Turfs Section */}

<h2 className="text-2xl font-bold mb-4">
All Turfs
</h2>

<div className="grid grid-cols-3 gap-4">

{
turfs.map(turf=>(
<div key={turf.id}>

<TurfCard turf={turf}/>

<button
onClick={()=>handleFeatured(turf.id)}
className="bg-yellow-500 text-white px-4 py-2 mt-2 rounded"
>
Make Featured
</button>

</div>
))
}

</div>

</div>

)

}

export default Home
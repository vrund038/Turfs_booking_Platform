import React, { useState } from 'react'
import API from '../services/api'

const AddTurf = () => {

const [name,setName] = useState("")
const [location,setLocation] = useState("")
const [price,setPrice] = useState("")

const handleAdd = async ()=>{

await API.post("/turfs",{
name,
location,
price_per_hour:price
})

alert("Turf Added")

}

return (

<div>

<h2>Add Turf</h2>

<input placeholder="Name" onChange={(e)=>setName(e.target.value)}/>

<input placeholder="Location" onChange={(e)=>setLocation(e.target.value)}/>

<input placeholder="Price" onChange={(e)=>setPrice(e.target.value)}/>

<button onClick={handleAdd}>
Add Turf
</button>

</div>

)

}

export default AddTurf
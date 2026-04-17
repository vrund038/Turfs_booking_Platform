import React, { useState, useEffect } from "react"
import API from "../services/api"

const AddTurf = () => {

const [name,setName] = useState("")
const [location,setLocation] = useState("")
const [price,setPrice] = useState("")
const [image,setImage] = useState("")
const [message,setMessage] = useState("")
const [turfs,setTurfs] = useState([])

useEffect(()=>{
fetchTurfs()
},[])

const fetchTurfs = async ()=>{
const res = await API.get("/turfs")
setTurfs(res.data)
}

// ✅ FIXED ADD TURF
const addTurf = async ()=>{

if(!name || !location || !price){
setMessage("Please fill all fields")
return
}

await API.post("/turfs",{
name,
location,
price_per_hour: price, // ✅ IMPORTANT FIX
image
})

setMessage("✅ Turf Added Successfully")

// Clear inputs
setName("")
setLocation("")
setPrice("")
setImage("")

fetchTurfs()
}

const deleteTurf = async(id)=>{
await API.delete(`/turfs/${id}`)
fetchTurfs()
}

return (

<div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-8">

<h1 className="text-3xl font-bold mb-6">
🏟️ Add Turf
</h1>

{message && (
<p className="mb-4 text-green-600 font-medium">{message}</p>
)}

{/* Form */}

<div className="bg-white p-6 rounded-2xl shadow-md mb-6 max-w-md">

<input 
placeholder="Turf Name"
className="border p-2 w-full mb-3 rounded"
value={name}
onChange={(e)=>setName(e.target.value)}
/>

<input 
placeholder="Location"
className="border p-2 w-full mb-3 rounded"
value={location}
onChange={(e)=>setLocation(e.target.value)}
/>

<input 
placeholder="Price per hour"
className="border p-2 w-full mb-3 rounded"
value={price}
onChange={(e)=>setPrice(e.target.value)}
/>

<input 
placeholder="Image URL"
className="border p-2 w-full mb-3 rounded"
value={image}
onChange={(e)=>setImage(e.target.value)}
/>

<button 
onClick={addTurf}
className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-2 rounded-lg hover:opacity-90"
>
Add Turf
</button>

</div>


{/* Turf List */}

<h2 className="text-xl font-semibold mb-4">
All Turfs
</h2>

<div className="grid gap-4">

{turfs.map(t=>(
<div key={t.id} className="bg-white p-4 rounded-xl shadow flex justify-between items-center">

<div>
<p className="font-bold">{t.name}</p>
<p className="text-sm text-gray-500">{t.location}</p>

<p className="text-green-600 font-semibold mt-1">
₹ {t.price_per_hour || 0} / hr
</p>
</div>

<button 
onClick={()=>deleteTurf(t.id)}
className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
>
Delete
</button>

</div>
))}

</div>

</div>

)

}

export default AddTurf
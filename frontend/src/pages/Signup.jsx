import React, { useState } from "react"
import API from "../services/api"
import { useNavigate, Link } from "react-router-dom"

const Signup = () => {

const [name,setName] = useState("")
const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const [error,setError] = useState("")

const navigate = useNavigate()

const handleSignup = async ()=>{

if(!name || !email || !password){
setError("All fields required")
return
}

try{

await API.post("/auth/register",{
name,
email,
password
})

navigate("/login")

}catch(err){
setError("Signup failed")
}

}

return (

<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-100">

<div className="bg-white p-8 rounded-2xl shadow-xl w-[400px]">

<h2 className="text-2xl font-bold mb-4 text-center">
📝 Signup
</h2>

{error && (
<div className="bg-red-100 text-red-600 p-2 mb-3 rounded">
{error}
</div>
)}

<input
placeholder="Name"
className="border p-2 w-full mb-3 rounded"
onChange={(e)=>setName(e.target.value)}
/>

<input
type="email"
placeholder="Email"
className="border p-2 w-full mb-3 rounded"
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
placeholder="Password"
className="border p-2 w-full mb-3 rounded"
onChange={(e)=>setPassword(e.target.value)}
/>

<button
onClick={handleSignup}
className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-2 rounded-lg"
>
Create Account
</button>

<p className="text-sm text-center mt-4">
Already have an account?{" "}
<Link to="/login" className="text-blue-600">
Login
</Link>
</p>

</div>

</div>

)

}

export default Signup
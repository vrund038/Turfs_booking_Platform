import React, { useState } from 'react'
import API from '../services/api'
import { useNavigate } from 'react-router-dom'

const Login = () => {

const navigate = useNavigate()

const [email,setEmail] = useState("")
const [password,setPassword] = useState("")

const handleLogin = async ()=>{

const res = await API.post("/auth/login",{
email,
password
})

localStorage.setItem("user",JSON.stringify(res.data.user))

localStorage.setItem("token",res.data.token)

navigate("/")

}

return (

<div className="p-4">

<h2 className="text-xl font-bold">
Login
</h2>

<input
type="email"
placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
className="border p-2 block mt-2"
/>

<input
type="password"
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}
className="border p-2 block mt-2"
/>

<button
onClick={handleLogin}
className="bg-blue-500 text-white px-4 py-2 mt-3"
>

Login

</button>

</div>

)

}

export default Login
import React, { useEffect, useState } from "react"
import API from "../services/api"

const AdminUsers = () => {

const [users,setUsers] = useState([])
const [loading,setLoading] = useState(true)
const [error,setError] = useState("")

useEffect(()=>{
fetchUsers()
},[])

const fetchUsers = async ()=>{
try{
const res = await API.get("/auth/users")
setUsers(res.data)
}catch(err){
setError("Failed to load users")
}finally{
setLoading(false)
}
}

const deleteUser = async(id)=>{
await API.delete(`/auth/users/${id}`)
fetchUsers()
}

return (

<div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 p-8">

<h1 className="text-3xl font-bold mb-6 text-gray-800">
👥 Manage Users
</h1>

<div className="bg-white rounded-2xl shadow-lg overflow-hidden">

{loading ? (
<p className="p-6 text-gray-500">Loading users...</p>
) : error ? (
<p className="p-6 text-red-500">{error}</p>
) : users.length === 0 ? (
<p className="p-6 text-gray-500">No users found</p>
) : (

<table className="w-full">

<thead className="bg-gray-100">
<tr>
<th className="p-4 text-left">Name</th>
<th>Email</th>
<th>Role</th>
<th>Action</th>
</tr>
</thead>

<tbody>

{users.map((u)=>(
<tr key={u.id} className="border-b hover:bg-gray-50">

<td className="p-4 font-medium">{u.name}</td>
<td>{u.email}</td>

<td>
<span className={`px-2 py-1 rounded text-xs ${
u.role === "admin"
? "bg-purple-200 text-purple-700"
: "bg-gray-200"
}`}>
{u.role}
</span>
</td>

<td>
<button
onClick={()=>deleteUser(u.id)}
className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
>
Delete
</button>
</td>

</tr>
))}

</tbody>

</table>

)}

</div>

</div>

)

}

export default AdminUsers
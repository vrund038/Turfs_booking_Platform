import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import API from "../services/api"

const AdminDashboard = () => {

const [stats,setStats] = useState({})
const [loading,setLoading] = useState(true)
const [error,setError] = useState("")

useEffect(()=>{
fetchStats()
},[])

const fetchStats = async ()=>{
try{
const res = await API.get("/admin/stats")
setStats(res.data)
}catch(err){
setError("Failed to load stats")
}finally{
setLoading(false)
}
}

return (

<div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">

{/* Header */}

<div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-5 flex justify-between items-center shadow-lg">

<h1 className="text-3xl font-bold">
⚙️ Admin Dashboard
</h1>

<p className="text-sm opacity-90">
Welcome Admin 👋
</p>

</div>


{/* Main Content */}

<div className="p-8">

<h2 className="text-2xl font-semibold mb-6 text-gray-700">
Quick Actions
</h2>

{/* Cards */}

<div className="grid grid-cols-3 gap-8">

{/* Add Turf */}

<Link to="/add-turf">
<div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition duration-300 cursor-pointer">

<h3 className="text-lg font-bold mb-2 text-blue-600">
🏟️ Add Turf
</h3>

<p className="text-gray-600 text-sm">
Add new turf details and manage listings
</p>

</div>
</Link>


{/* Manage Bookings */}

<Link to="/admin/bookings">
<div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition duration-300 cursor-pointer">

<h3 className="text-lg font-bold mb-2 text-green-600">
📅 Manage Bookings
</h3>

<p className="text-gray-600 text-sm">
View and cancel bookings
</p>

</div>
</Link>


{/* Manage Users */}

<Link to="/admin/users">
<div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition duration-300 cursor-pointer">

<h3 className="text-lg font-bold mb-2 text-purple-600">
👥 Manage Users
</h3>

<p className="text-gray-600 text-sm">
View and control registered users
</p>

</div>
</Link>

</div>


{/* Stats Section */}

<div className="mt-12">

<h2 className="text-2xl font-semibold mb-6 text-gray-700">
Overview
</h2>

{/* Loading / Error */}

{loading ? (
<p className="text-gray-500">Loading stats...</p>
) : error ? (
<p className="text-red-500">{error}</p>
) : (

<div className="grid grid-cols-3 gap-8">

{/* Turfs */}

<div className="bg-white p-6 rounded-2xl shadow-md text-center hover:shadow-lg transition">

<p className="text-gray-500 text-sm">Total Turfs</p>

<h3 className="text-3xl font-bold text-blue-600 mt-2">
{stats.turfs || 0}
</h3>

</div>


{/* Bookings */}

<div className="bg-white p-6 rounded-2xl shadow-md text-center hover:shadow-lg transition">

<p className="text-gray-500 text-sm">Bookings</p>

<h3 className="text-3xl font-bold text-green-600 mt-2">
{stats.bookings || 0}
</h3>

</div>


{/* Users */}

<div className="bg-white p-6 rounded-2xl shadow-md text-center hover:shadow-lg transition">

<p className="text-gray-500 text-sm">Users</p>

<h3 className="text-3xl font-bold text-purple-600 mt-2">
{stats.users || 0}
</h3>

</div>

</div>

)}

</div>

</div>

</div>

)

}

export default AdminDashboard
import React from 'react'
import { Link } from "react-router-dom"

const AdminDashboard = () => {

return (

<div className="min-h-screen bg-gray-100">

{/* Header */}

<div className="bg-blue-600 text-white p-4 flex justify-between items-center">

<h1 className="text-2xl font-bold">
Admin Dashboard
</h1>

<p>Welcome Admin 👋</p>

</div>


{/* Main Content */}

<div className="p-6">

<h2 className="text-xl font-semibold mb-4">
Quick Actions
</h2>

<div className="grid grid-cols-3 gap-6">

{/* Add Turf */}

<Link to="/add-turf">
<div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer">

<h3 className="text-lg font-bold mb-2">
🏟️ Add Turf
</h3>

<p className="text-gray-600">
Add new turf details and manage listings
</p>

</div>
</Link>


{/* Bookings */}

<Link to="/bookings">
<div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer">

<h3 className="text-lg font-bold mb-2">
📅 View Bookings
</h3>

<p className="text-gray-600">
Check all user bookings and schedules
</p>

</div>
</Link>


{/* Users */}

<Link to="/users">
<div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer">

<h3 className="text-lg font-bold mb-2">
👥 Manage Users
</h3>

<p className="text-gray-600">
View and control registered users
</p>

</div>
</Link>

</div>


{/* Stats Section (Optional but cool) */}

<div className="mt-10">

<h2 className="text-xl font-semibold mb-4">
Overview
</h2>

<div className="grid grid-cols-3 gap-6">

<div className="bg-white p-4 rounded shadow text-center">
<p className="text-gray-500">Total Turfs</p>
<h3 className="text-2xl font-bold">10</h3>
</div>

<div className="bg-white p-4 rounded shadow text-center">
<p className="text-gray-500">Bookings</p>
<h3 className="text-2xl font-bold">25</h3>
</div>

<div className="bg-white p-4 rounded shadow text-center">
<p className="text-gray-500">Users</p>
<h3 className="text-2xl font-bold">15</h3>
</div>

</div>

</div>

</div>

</div>

)

}

export default AdminDashboard
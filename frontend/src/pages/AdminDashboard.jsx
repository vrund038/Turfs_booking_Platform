import React from 'react'
import { Link } from "react-router-dom"

const AdminDashboard = () => {

return (

<div>

<h1 className="text-2xl font-bold">
Admin Dashboard
</h1>

<Link to="/add-turf">Add Turf</Link>
<Link to="/bookings">View Bookings</Link>
<Link to="/users">Users</Link>

</div>

)

}

export default AdminDashboard
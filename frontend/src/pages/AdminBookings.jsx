import React, { useEffect, useState } from "react"
import API from "../services/api"

const AdminBookings = () => {

const [bookings,setBookings] = useState([])

useEffect(()=>{
fetchBookings()
},[])

const fetchBookings = async ()=>{
const res = await API.get("/bookings/all")
setBookings(res.data)
}

const cancelBooking = async(id)=>{
await API.delete(`/bookings/${id}`)
fetchBookings()
}

return (

<div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-8">

<h1 className="text-3xl font-bold mb-6">
📅 Manage Bookings
</h1>

<div className="bg-white rounded-2xl shadow-lg overflow-hidden">

{bookings.length === 0 ? (
<p className="p-6 text-gray-500">No bookings found</p>
) : (

<table className="w-full">

<thead className="bg-gray-100">
<tr>
<th className="p-4 text-left">Turf</th>
<th>Date</th>
<th>Time</th>
<th>User</th>
<th>Action</th>
</tr>
</thead>

<tbody>

{bookings.map((b)=>(
<tr key={b.id} className="border-b hover:bg-gray-50">

<td className="p-4 font-medium">{b.turf_name}</td>
<td>{b.booking_date}</td>
<td>{b.time_slot}</td>
<td>{b.user_id}</td>

<td>
<button
onClick={()=>cancelBooking(b.id)}
className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
>
Cancel
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

export default AdminBookings
import React, { useEffect, useState } from "react"
import API from "../services/api"
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"

const UserAnalytics = () => {

const [data,setData] = useState(null)

const user = JSON.parse(localStorage.getItem("user"))?.user

useEffect(()=>{
fetchData()
},[])

const fetchData = async ()=>{
const res = await API.get(`/user-analytics/${user.id}`)
setData(res.data)
}

if(!data){
return <p className="p-8">Loading...</p>
}

return (

<div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-8">

<h1 className="text-3xl font-bold mb-6">
📊 My Activity
</h1>

{/* Stats */}

<div className="grid grid-cols-3 gap-6 mb-8">

<div className="bg-white p-6 rounded-xl shadow text-center">
<p>Total Bookings</p>
<h2 className="text-2xl font-bold">
{data.totalBookings}
</h2>
</div>

<div className="bg-white p-6 rounded-xl shadow text-center">
<p>Total Spent</p>
<h2 className="text-2xl font-bold text-green-600">
₹ {data.totalSpent}
</h2>
</div>

<div className="bg-white p-6 rounded-xl shadow text-center">
<p>Favorite Turf</p>
<h2 className="text-xl font-bold">
{data.favorite?.name || "N/A"}
</h2>
</div>

</div>

{/* Chart */}

<div className="bg-white p-6 rounded-xl shadow">

<h2 className="text-xl font-semibold mb-4">
My Bookings Trend
</h2>

<BarChart width={600} height={300} data={data.daily}>
<CartesianGrid strokeDasharray="3 3" />
<XAxis dataKey="date" />
<YAxis />
<Tooltip />
<Bar dataKey="count" />
</BarChart>

</div>

</div>

)

}

export default UserAnalytics
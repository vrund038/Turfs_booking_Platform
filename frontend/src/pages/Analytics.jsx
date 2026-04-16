import React, { useEffect, useState } from 'react'
import API from '../services/api'

const Analytics = () => {

const [players,setPlayers] = useState([])

useEffect(()=>{
fetchLeaderboard()
},[])

const fetchLeaderboard = async ()=>{
const res = await API.get("/player-stats/leaderboard/all")
setPlayers(res.data)
}

return (

<div className="p-8 bg-gray-100 min-h-screen">

<h1 className="text-3xl font-bold mb-6">
📊 Analytics
</h1>

<div className="bg-white rounded shadow">

{players.map((p,index)=>{

const isMVP = index === 0

return (

<div key={p.id} className="flex justify-between p-4 border-b">

<div>
<p className="font-semibold">#{index+1} {p.name}</p>
<p className="text-sm text-gray-500">
Runs: {p.total_runs} | Wickets: {p.total_wickets}
</p>
</div>

<div className="flex gap-2">

{isMVP && (
<span className="bg-yellow-200 px-2 py-1 rounded text-xs">🏆 MVP</span>
)}

{p.total_runs >= 50 && (
<span className="bg-green-100 px-2 py-1 rounded text-xs">50+</span>
)}

{p.total_runs >= 100 && (
<span className="bg-blue-100 px-2 py-1 rounded text-xs">100+</span>
)}

</div>

</div>

)
})}

</div>

</div>

)

}

export default Analytics
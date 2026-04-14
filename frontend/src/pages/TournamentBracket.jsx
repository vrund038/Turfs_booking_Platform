import React, { useEffect, useState } from 'react'
import API from '../services/api'
import { useParams } from 'react-router-dom'

const TournamentBracket = () => {

const { id } = useParams()

const [matches,setMatches] = useState([])

useEffect(()=>{
fetchMatches()
},[])

const fetchMatches = async ()=>{
const res = await API.get(`/matches/${id}`)
setMatches(res.data)
}

const MatchCard = ({match,highlight}) => (

<div className={` 
backdrop-blur-lg 
bg-white/80 
border 
rounded-xl 
p-4 
shadow-lg 
transition 
hover:scale-105 
hover:shadow-2xl
${highlight && "bg-yellow-100 border-yellow-400"}
`}>

<div className="flex justify-between font-semibold">

<span>{match.team1}</span>
<span className="text-blue-600">
{match.team1_score || 0}
</span>

</div>

<div className="text-center text-gray-400 my-2">
VS
</div>

<div className="flex justify-between font-semibold">

<span>{match.team2}</span>
<span className="text-blue-600">
{match.team2_score || 0}
</span>

</div>

{/* Status Badge */}

<div className="text-xs mt-3">

{match.team1_score || match.team2_score ? (

<span className="bg-green-100 text-green-700 px-2 py-1 rounded">
Completed
</span>

) : (

<span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
Upcoming
</span>

)}

</div>

</div>

)

return (

<div className="p-8 min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">

{/* Header */}

<div className="text-center mb-8">

<h1 className="text-4xl font-bold">
🏆 Tournament Bracket
</h1>

<p className="text-gray-500 mt-2">
Knockout Tournament View
</p>

</div>


<div className="grid grid-cols-3 gap-8 items-center">


{/* Round 1 */}

<div>

<h2 className="text-xl font-bold mb-4 text-center text-blue-600">
Round 1
</h2>

<div className="space-y-6">

{
matches.slice(0,2).map(match=>(
<MatchCard key={match.id} match={match}/>
))
}

</div>

</div>



{/* Semi Final */}

<div>

<h2 className="text-xl font-bold mb-4 text-center text-purple-600">
Semi Final
</h2>

<div className="space-y-6 mt-20">

{
matches.slice(2,3).map(match=>(
<MatchCard key={match.id} match={match}/>
))
}

</div>

</div>



{/* Final */}

<div>

<h2 className="text-xl font-bold mb-4 text-center text-yellow-600">
Final
</h2>

<div className="space-y-6 mt-36">

{
matches.slice(3,4).map(match=>(
<MatchCard key={match.id} match={match} highlight/>
))
}

</div>

</div>


</div>


{/* Winner Section */}

<div className="mt-12 text-center">

<h2 className="text-2xl font-bold mb-4">
🏆 Champion
</h2>

<div className="inline-block bg-yellow-100 px-8 py-4 rounded-xl shadow-lg hover:scale-105 transition">

Winner will appear after Final

</div>

</div>

</div>




)

}

export default TournamentBracket
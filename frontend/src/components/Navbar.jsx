import { Link, useNavigate } from "react-router-dom"

const Navbar = () => {

const navigate = useNavigate()

const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user")) || null
  } catch {
    return null
  }
}

const data = getUser()
const user = data?.user   // ✅ FIXED

const logout = ()=>{
localStorage.removeItem("user")
navigate("/login")
}

return (

<div className="bg-white/80 backdrop-blur-md shadow-md px-8 py-4 flex justify-between items-center sticky top-0 z-50">

<h1 
className="font-bold text-2xl text-blue-600 cursor-pointer"
onClick={()=>navigate("/")}
>
🏏 TurfBook
</h1>

<div className="flex gap-6 items-center text-gray-700 font-medium">

<Link to="/">Home</Link>

{user && <Link to="/tournament">Tournament</Link>}
{user && <Link to="/analytics/1">Analytics</Link>}

{user?.role === "admin" && (
<Link to="/admin" className="text-purple-600">
Admin
</Link>
)}

{user ? (
<>
<span className="text-sm">Hi, {user.name}</span>

<button 
onClick={logout}
className="bg-red-500 text-white px-3 py-1 rounded-lg"
>
Logout
</button>
</>
) : (
<>
<Link to="/login">Login</Link>
<Link to="/signup">Signup</Link>
</>
)}

</div>

</div>

)

}

export default Navbar
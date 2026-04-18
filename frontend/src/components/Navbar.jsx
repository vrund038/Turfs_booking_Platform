import { Link, useNavigate, useLocation } from "react-router-dom"

const Navbar = () => {

const navigate = useNavigate()
const location = useLocation()

const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user")) || null
  } catch {
    return null
  }
}

const data = getUser()
const user = data?.user

const logout = ()=>{
localStorage.removeItem("user")
navigate("/login")
}

// ✅ Active route helper
const isActive = (path) => location.pathname === path

return (

<div className="bg-white/80 backdrop-blur-md shadow-md px-8 py-4 flex justify-between items-center sticky top-0 z-50">

{/* Logo */}
<h1 
className="font-bold text-2xl text-blue-600 cursor-pointer"
onClick={()=>navigate("/")}>
🏏 TurfBook
</h1>

{/* Menu */}
<div className="flex gap-6 items-center text-gray-700 font-medium">

{/* Home */}
<Link 
to="/" 
className={isActive("/") ? "text-blue-600 font-semibold" : ""}
>
Home
</Link>

{/* Logged-in only */}
{user && (
<>
<Link 
to="/tournament"
className={isActive("/tournament") ? "text-blue-600" : ""}
>
Tournament
</Link>

<Link 
to="/my-analytics"
className={isActive("/my-analytics") ? "text-blue-600" : ""}
>
My Analytics
</Link>
</>
)}

{/* Admin only */}
{user?.role === "admin" && (
<Link 
to="/admin" 
className={isActive("/admin") ? "text-purple-600 font-semibold" : "text-purple-600"}
>
Admin
</Link>
)}

{/* Right side */}
{user ? (
<>
<span className="text-sm text-gray-600">
Hi, {user.name}
</span>

<button 
onClick={logout}
className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
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
import { Navigate } from "react-router-dom"

const AdminRoute = ({ children }) => {

const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user")) || null
  } catch {
    return null
  }
}

const data = getUser()
const user = data?.user   // ✅ FIXED

if(!user || user.role !== "admin"){
return <Navigate to="/"/>
}

return children

}

export default AdminRoute
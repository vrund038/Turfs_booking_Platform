import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ children }) => {

const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user")) || null
  } catch {
    return null
  }
}

const data = getUser()
const user = data?.user   // ✅ FIXED

if(!user){
return <Navigate to="/login"/>
}

return children

}

export default ProtectedRoute
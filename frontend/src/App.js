import { BrowserRouter, Routes, Route } from "react-router-dom"

// Components
import Navbar from "./components/Navbar"
import ProtectedRoute from "./components/ProtectedRoute"
import AdminRoute from "./components/AdminRoute"

// Pages
import Home from "./pages/Home"
import TurfDetails from "./pages/TurfDetails"
import Booking from "./pages/Booking"
import Login from "./pages/Login"
import BookingSuccess from "./pages/BookingSuccess"
import AdminDashboard from "./pages/AdminDashboard"
import Tournament from "./pages/Tournament"
import RegisterTeam from "./pages/RegisterTeam"
import TournamentDetails from "./pages/TournamentDetails"
import TournamentBracket from "./pages/TournamentBracket"
import LiveScore from "./pages/LiveScore"
import TeamPlayers from "./pages/TeamPlayers"
import Scorecard from "./pages/Scorecard"
import Analytics from "./pages/Analytics"
import Signup from "./pages/Signup"

function App() {

return (

<BrowserRouter>

{/* Navbar always visible */}
<Navbar/>

<Routes>

{/* Public Routes */}
<Route path="/" element={<Home/>}/>
<Route path="/turf/:id" element={<TurfDetails/>}/>
<Route path="/login" element={<Login/>}/>
<Route path="/signup" element={<Signup/>}/>

{/* Protected Routes */}
<Route 
path="/booking/:id" 
element={
<ProtectedRoute>
<Booking/>
</ProtectedRoute>
}
/>

<Route 
path="/success" 
element={
<ProtectedRoute>
<BookingSuccess/>
</ProtectedRoute>
}
/>

<Route 
path="/tournament" 
element={
<ProtectedRoute>
<Tournament/>
</ProtectedRoute>
}
/>

<Route 
path="/register-team/:id" 
element={
<ProtectedRoute>
<RegisterTeam/>
</ProtectedRoute>
}
/>

<Route 
path="/tournament/:id" 
element={
<ProtectedRoute>
<TournamentDetails/>
</ProtectedRoute>
}
/>

<Route 
path="/tournament-bracket/:id" 
element={
<ProtectedRoute>
<TournamentBracket/>
</ProtectedRoute>
}
/>

<Route 
path="/live-score/:id" 
element={
<ProtectedRoute>
<LiveScore/>
</ProtectedRoute>
}
/>

<Route 
path="/team/:id" 
element={
<ProtectedRoute>
<TeamPlayers/>
</ProtectedRoute>
}
/>

<Route 
path="/scorecard/:id" 
element={
<ProtectedRoute>
<Scorecard/>
</ProtectedRoute>
}
/>

<Route 
path="/analytics/:tournamentId" 
element={
<ProtectedRoute>
<Analytics/>
</ProtectedRoute>
}
/>

{/* Admin Route */}
<Route 
path="/admin" 
element={
<AdminRoute>
<AdminDashboard/>
</AdminRoute>
}
/>

</Routes>

</BrowserRouter>

)

}

export default App
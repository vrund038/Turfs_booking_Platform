import { BrowserRouter, Routes, Route } from "react-router-dom"
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

function App() {

return (

<BrowserRouter>

<Routes>

<Route path="/" element={<Home/>}/>
<Route path="/turf/:id" element={<TurfDetails/>}/>
<Route path="/booking/:id" element={<Booking/>}/>
<Route path="/login" element={<Login/>}/>
<Route path="/success" element={<BookingSuccess/>}/>
<Route path="/admin" element={<AdminDashboard/>}/>
<Route path="/tournament" element={<Tournament/>}/>
<Route path="/register-team/:id" element={<RegisterTeam/>}/>
<Route path="/tournament/:id" element={<TournamentDetails/>}/>
<Route path="/tournament-bracket/:id" element={<TournamentBracket/>}/>
<Route path="/live-score/:id" element={<LiveScore/>}/>
</Routes>

</BrowserRouter>

);

}

export default App;
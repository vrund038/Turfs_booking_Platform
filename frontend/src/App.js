import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import TurfDetails from "./pages/TurfDetails"
import Booking from "./pages/Booking"
import Login from "./pages/Login"

function App() {

return (

<BrowserRouter>

<Routes>

<Route path="/" element={<Home/>}/>
<Route path="/turf/:id" element={<TurfDetails/>}/>
<Route path="/booking/:id" element={<Booking/>}/>
<Route path="/login" element={<Login/>}/>

</Routes>

</BrowserRouter>

);

}

export default App;
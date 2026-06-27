import Signup from "./pages/signup"
import Signin from "./pages/signin"
import Dashboard from "./pages/dashboard"
import SendMoney from "./pages/sendmoney"
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Navigation from "./components/navigation"
import Hero from "./components/hero"
import Herox from "./components/hero2"



export default function App(){
  return(
   <>
    <BrowserRouter>
    <Navigation />
    <Hero />
    <Herox />
    <Routes>
      <Route path="/signup" element={<Signup/>} />
      <Route path="/signin" element={<Signin/>} />
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/send" element={<SendMoney />}/>
    </Routes>
    </BrowserRouter>
    </>
  
  


  )
}

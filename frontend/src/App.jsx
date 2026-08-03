import{Route,Routes} from "react-router-dom";
import Home from "./pages/Home"
// import  Navbar  from "./components/core/common/Navbar";
function App() {

  return (
   <div  className="min-h-screen w-full bg-richblack-900"> 
   {/* <Navbar/> */}
    <Routes>
      <Route path = "/" element = {<Home/>}/>
    </Routes>
   </div>
  
  )
}
 
export default App

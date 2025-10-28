import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom"
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Dashboard/Home";

const App = () => {
  return (
    <div className="flex justify-center">
      <Router>
        <Routes>
          <Route path="/" element={<Root />}/>
          <Route path="/login" exact element={<Login/>}/>
          <Route path="/signup" exact element={<SignUp/>}/>
          <Route path="/home" exact element={<Home/>}/>
        </Routes>
      </Router>
    </div>
  )
}

const Root = () => {
  // Check apakah token ada di localStorage
  const isAuthenticated = !!localStorage.getItem("token");

  // Redirect to pages
  return isAuthenticated ? (
    <Navigate to="/home" />
  ) : (
    <Navigate to="/login" />
  )
}

export default App
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Dashboard/Home";
import UserProvider from "./context/UserContext";
import Income from "./pages/Dashboard/Income";
import Expense from "./pages/Dashboard/Expense";

const App = () => {
  return (
    <UserProvider>
      <div className="flex justify-center">
        <Router>
          <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/signup" exact element={<SignUp />} />
            <Route path="/home" exact element={<Home />} />
            <Route path="/income" exact element={<Income />} />
            <Route path="/expanse" exact element={<Expense />} />
          </Routes>
        </Router>
      </div>
    </UserProvider>
  );
};

const Root = () => {
  // Check apakah token ada di localStorage
  const isAuthenticated = !!localStorage.getItem("token");

  // Redirect to pages
  return isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/login" />;
};

export default App;

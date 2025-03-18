import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import { AuthContextProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Account from "./pages/Account";
import ProtectedRoute from "./components/ProtectedRoute";
import Player from "./components/player";


function App() {
  return (
    <>
      
      <AuthContextProvider>
       
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route path="/player/:id" element={<Player/>} />
        </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;

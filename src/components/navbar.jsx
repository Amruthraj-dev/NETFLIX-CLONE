import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import netflix_spinner from "../assets/netflix_spinner.gif";

const Navbar = () => {  
  const { user, logOut,setLikes, loading, setLoading } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      setLoading(true);
      setLikes({}); 
      await logOut();
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <div className="w-full h-[100vh] flex justify-center items-center ">
      <img className="w-[60px] " src={netflix_spinner} alt="loading..." />
    </div>
  ) : (
    <div className="flex items-center justify-between p-4 z-[100] w-full absolute ">
      <Link to="/">
        <h1 className="text-red-600 text-4xl font-medium cursor-pointer">
          NETFLIX
        </h1>
      </Link>
      {user ? (
        <div>
          <Link to="/account">
            <button className="text-white pr-4">Account</button>
          </Link>

          <button
            onClick={handleLogout}
            className="bg-red-600 px-6 py-2 rounded cursor-pointer text-white"
          >
            Logout
          </button>
        </div>
      ) : (
        <div>
          <Link to="/login">
            <button className="text-white pr-4">Signin</button>
          </Link>
          <Link to="/signup">
            <button className="bg-red-600 px-6 py-2 rounded cursor-pointer text-white">
              Signup
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;

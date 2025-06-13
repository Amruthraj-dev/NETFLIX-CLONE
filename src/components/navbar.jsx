import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import netflix_spinner from "../assets/netflix_spinner.gif";

const Navbar = () => {
  const { user, logOut, setLikes, loading, setLoading } = UserAuth();
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);

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
    <div className="w-full h-screen flex justify-center items-center">
      <img className="w-[60px]" src={netflix_spinner} alt="loading..." />
    </div>
  ) : (
    <>
      <div className="flex items-center justify-between px-4 py-3 sm:py-4 z-[100] w-full absolute bg-transparent">
        <Link to="/">
          <h1 className="text-red-600 text-4xl sm:text-4xl font-semibold cursor-pointer">
            NETFLIX
          </h1>
        </Link>

        <div className="flex items-center space-x-2 sm:space-x-4 text-sm sm:text-base">
          {user ? (
            <>
              <Link to="/account">
                <button className="text-white border px-3 py-1.5 rounded hover:bg-gray-200/80 hover:text-red-500 transition">
                  My List
                </button>
              </Link>
              <button
                onClick={() => setShowProfile(true)}
                className="text-white border px-3 py-1.5 rounded hover:bg-gray-200/70 hover:text-red-500 transition"
              >
                Profile
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-600 px-3 sm:px-6 py-1.5 sm:py-2 rounded text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/">
                <button className="text-white">Signin</button>
              </Link>
              <Link to="/signup">
                <button className="bg-red-600 px-3 sm:px-6 py-1.5 sm:py-2 rounded text-white">
                  Signup
                </button>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Profile Modal */}
      {showProfile && (
        <div className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="bg-[#111] text-white rounded-lg shadow-lg p-6 w-full max-w-xs relative">
            <button
              onClick={() => setShowProfile(false)}
              className="absolute top-2 right-3 text-gray-300 text-xl hover:text-white"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-center">User Profile</h2>
            <div className="space-y-2">
              <p><span className="text-gray-400">Email:</span> {user?.email}</p>
              <p><span className="text-gray-400">UID:</span> {user?.uid?.slice(0, 10)}...</p>
              <p><span className="text-gray-400">Verified:</span> {user?.emailVerified ? "Yes" : "No"}</p>
            </div>
            <div className="mt-6 text-center">
              <button
                onClick={() => setShowProfile(false)}
                className="bg-red-600 px-4 py-2 rounded text-white hover:bg-red-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;

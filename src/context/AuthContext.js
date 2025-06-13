  import { createContext, useContext, useEffect, useState } from "react";
  import { auth, db } from "../firebase";
  import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
  } from "firebase/auth";
  import { setDoc, doc } from "firebase/firestore";

  const AuthContext = createContext();

  export function AuthContextProvider({ children }) {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({});

    const [likes, setLikes] = useState({});

  async function signUp(email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User signed up:", userCredential.user);

      await setDoc(doc(db, "users", email), {
        savedShows: [],
      });

      return { success: true, user: userCredential.user };
    } catch (err) {
      console.error("Signup error:", err.code, err.message);

      return { success: false, code: err.code, message: err.message };
    }
  }

    function logIn(email, password) {
      return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = async () => {
      try {
        setLikes({});
        await signOut(auth);
      } catch (error) {
        console.error("Error logging out:", error);
      }
    };

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) =>
        setUser(currentUser)
      );
      return () => {
        unsubscribe();
      };
    },[]);

    return (
      <AuthContext.Provider
        value={{
          signUp,
          logIn,
          logOut,
          user,
          loading,
          likes,
          setLikes,
          setLoading,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }

  export function UserAuth() {
    return useContext(AuthContext);
  }

import { createContext,useContext,useEffect,useState } from "react";
import {auth,db} from "../firebase"
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,onAuthStateChanged} from "firebase/auth"
import {setDoc,doc} from "firebase/firestore"




const AuthContext=createContext()

export function AuthContextProvider({children}){
    
    const [loading,setLoading]=useState(false)
    const [user,setUser]=useState({})

    const [likes, setLikes] = useState({});

    function signUp(email,password){
        createUserWithEmailAndPassword(auth,email,password)
        setDoc(doc(db,"users",email),{
            savedShows:[]
        })
    }

    function logIn(email,password){
        return signInWithEmailAndPassword(auth,email,password)
    }

    const logOut = async () => {
  try {
    setLikes({});
    await signOut(auth);
  } catch (error) {
    console.error("Error logging out:", error);
  }
};

    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth,(currentUser)=>
        setUser(currentUser))
        return ()=>{ unsubscribe()}
    })
      

    return (
        <AuthContext.Provider value={{signUp,logIn,logOut,user,loading,likes,setLikes,setLoading}}>
            {children}
        </AuthContext.Provider>
    )
}

export function UserAuth(){
    return useContext(AuthContext)
}
import { useState,useEffect, useContext } from "react";
import FirebaseContext from "../context/firebase";

export default function useAuthListener(){
    const localUser = JSON.parse(localStorage.getItem('authUser'))||{};
    const[user,setUser]=useState(localUser);
    const{firebase}=useContext(FirebaseContext);
     
    useEffect(()=>{
        const listener=firebase.auth().onAuthStateChanged((authUser)=>{
            if(authUser){
                localStorage.setItem('authUser',JSON.stringify(authUser));
                setUser(authUser);
            } 
            else {
                localStorage.clear();
                setUser(null);
            }
        });
        return ()=>listener();
    }, [firebase]);
    return{user};
}
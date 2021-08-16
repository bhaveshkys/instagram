import { useContext, useEffect, useState } from "react";
import UserContext from "../context/user";
import { getUserByUserId,getPhotos } from "../services/firebase";

export default function usePhotos(){
    const [photos,setPhotos]=useState(null);
    const {
        user:{
            uid:userId=''
        }
    }=useContext(UserContext);
    

    useEffect(()=>{
        async function getTimelinePhotos(){
            const [{following}]=await getUserByUserId(userId);
            let followerUserPhotos =[];

            if(following.length>0){
                followerUserPhotos = await getPhotos(userId,following);
            }
            followerUserPhotos.sort((a,b)=>b.dateCreated-a.dateCreated);
            setPhotos(followerUserPhotos);
            
        }
        
        getTimelinePhotos();
    },[userId]);
    console.log({photos});  
    return {photos}
}   
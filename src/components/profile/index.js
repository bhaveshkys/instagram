import { useEffect, useReducer } from "react";
import { getUserPhotosByUserId } from "../../services/firebase";
import Photos from "./photos";
import PHeader from "./header";


export default function UserProfile({user}){
    //console.log("userinprofile",user)
    const reducer=(state,newState)=>({...state,...newState});
    const initialState={
    profile:{},
    photosCollection:[],
    followerCount:0
    };
    const [{profile,photosCollection,followerCount},dispatch]=useReducer(
        reducer,
        initialState
    );
    useEffect(()=>{
        async function getProfileAndPhotos(){
            //const[user]=await getUserByUsername(user.username);
            //console.log("user",user)
            const photos = await getUserPhotosByUserId(user.userId);
            console.log("photos",photos)
            dispatch({profile:user,photosCollection:photos,followerCount:user.followers.length});
        }
        getProfileAndPhotos();
    },[])
    console.log("photocolection",photosCollection)
    return (
        <>
        
            <PHeader photosCount={photosCollection ? photosCollection.length :0}
                    profile={profile}
                    followerCount={followerCount}
                    setFollowerCount={dispatch}
             />
            <Photos photos={photosCollection} />
        </>
    );

}
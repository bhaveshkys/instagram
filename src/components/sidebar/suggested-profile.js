import { useState } from "react";
import { Link } from "react-router-dom";
import { updateFollowedUserFollowers, updateLoggedinUserFollowing } from "../../services/firebase";

export default function SuggestedProfile({key ,profileDocId,username,profileId,userId,loggedInUserDocId}){
    const [followed ,setFollowed]=useState(false);
    async function handleFollower(){
        setFollowed(true);
        await updateLoggedinUserFollowing(loggedInUserDocId,profileId,false);
        await updateFollowedUserFollowers(profileDocId,userId,false);
    }
    return !followed?(
    <div className=" flex flex-row items-center align-items justify-between">
        <Link to={`/p/${username}`}>
            <div className="  flex flex-row items-center align-items justify-between">
                <div className="flex f items-center align-items justify-between ">
                <img
                    className="rounded-full h-8 w-8 flex justify-start mx-2"
                    src={`/images/avatars/${username}.jpg`}
                    alt=""
                />
                <p className="font-bold text-sm">{username}</p>    
                </div>
                
            </div>
            
        </Link>
        <button 
            className=" justify-start text-xs font-bold text-blue-medium mx-2" 
            type="button"
            onClick={ handleFollower} >
                Follow
        </button>
    </div>
    ):null

    
}
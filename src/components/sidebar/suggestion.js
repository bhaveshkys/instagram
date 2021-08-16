import { useContext, useEffect , useState } from "react";
import UserContext from "../../context/user";
import { getSuggestions } from "../../services/firebase";
import Skeleton from "react-loading-skeleton";
import SuggestedProfile from "./suggested-profile";
export default function Suggestion({userId,following,loggedInUserDocId}){
    const [profiles,setProfiles]=useState({})
    useEffect(()=>{

        async function suggestProfiles(){
            const response = await getSuggestions(userId ,following);
            console.log("res",response);
            setProfiles(response);
        }
        if(userId){
            suggestProfiles();
            console.log("profiles",profiles);
        }
        
    },[userId]);
    
    return !profiles ?(
        <Skeleton count={1} height={150} className="mt-5"/>
    ) : profiles.length > 0 ?(
        <div className="rounded flex flex-col">
            <div className=" text-sm flex items-center align-items justify-between mb-2">
                <p className="font-bold text-gray-base">Suggestions for you</p>
            </div>
            <div className=" mt-4 grid gap-5">
                {profiles.map((profile)=>
                    <SuggestedProfile
                        key={profile.DocId}
                        profileDocId={profile.DocId}
                        username={profile.username}
                        profileId={profile.userId}
                        userId={userId}
                        loggedInUserDocId={loggedInUserDocId}
                        
                    />
                )}
                
            </div>
        </div>
    ) : null;
        
    
}
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import useUser from '../../hooks/use-user';
import {isUserFollowingProfile ,updateFollowedUserFollowers,updateLoggedinUserFollowing,getUserByUserId} from '../../services/firebase';
export default function PHeader({photosCount,profile,followerCount,setFollowerCount}){
    const [isFollowingProfile,setIsFollowingProfile]=useState(false);
    const {user}=useUser();
    const ownProfile= user.userId == profile.userId ?true:false;
    
    useEffect(()=>{
       async function isLoggedInUserFollowingProfile(){
        const isFollowing = await isUserFollowingProfile(user.userId,profile.userId);
        setIsFollowingProfile(isFollowing);
        };
        if(user.userId && profile.userId){
            isLoggedInUserFollowingProfile();
        }
    },[user.userId, profile.userId,profile.followers])
    async function handleFollower(){
        console.log("clicked")
        //console.log("before",followerCount)
        if(isFollowingProfile){
            setIsFollowingProfile(false);
            await updateLoggedinUserFollowing(user.DocId,profile.userId,true);
            await updateFollowedUserFollowers(profile.DocId,user.userId,true);

        }else{
            setIsFollowingProfile(true);
            await updateLoggedinUserFollowing(user.DocId,profile.userId,false);
            await updateFollowedUserFollowers(profile.DocId,user.userId,false);
            
        }
        setFollowerCount({
            followerCount:isFollowingProfile?followerCount-1:followerCount+1

        })
        //console.log("after",followerCount)
        
    }
    console.log(photosCount)
    return (
        <div className="grid grid-cols-3 gap-4 justify-between mx-auto
         max-w-screen-lg">
            <div className="container flex justify-center">
            {profile.userId && (
                <img
                    className="rounded-full h-40 w-40 flex"
                    alt={`${profile.username} profile picture`}
                    src={`/images/avatars/${profile.username}.jpg`}
                />
            )}
            </div>
            <div className="flex items-center justify-center flex-col col-span-2">
                <div className="container flex items-center">
                   <p className="text-2xl mr-4">{profile.username}</p>
                   {!ownProfile &&(
                       <button
                           className=" bg-blue-medium font-bold text-sm rounded text-white
                            w-20 h-8"
                            type="button"
                            onClick={handleFollower}
                       >
                           {isFollowingProfile ? 'Unfollow' : 'Follow'}
                       </button>
                   )} 
                </div>
                <div className="container flex mt-4">
                    {!profile.followers||!profile.following?(
                        <Skeleton count={1} width={677} height={24}/>
                    ):  (
                            <>
                                <p className="mr-10">
                                    <span className="font-bold">{photosCount}</span>{` `}
                                    {photosCount<=1?`Photo`:`Photos`}
                                </p>
                                <p className="mr-10">
                                    <span className="font-bold">{followerCount}</span>
                                    {` `}
                                    {profile.followers?.length<=1?`follower`:`followers`}
                                </p>
                                <p className="mr-10">
                                    <span className="font-bold">{profile.following?.length}</span>{` `}
                                    following
                                </p>
                            </>
                        )}   
                </div>
                <div className="container mt-4">
                    <p className="font-medium">{!profile.fullName?<Skeleton count={1}height={24}/> :profile.fullName}</p>
                </div>

            </div>
        </div>
    );
}  
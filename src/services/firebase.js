import firebase from "firebase/app"
export async function doesUsernameExists(username){
    const result = await firebase
    .firestore()
    .collection('users')
    .where('username','==',username)
    .get();
    return result.docs.map((user)=> user.data().length>0);
}

// get user from the firestore where userId === userId (passed from the auth)
export async function getUserByUserId(userId) {
    const result = await firebase.firestore().collection('users').where('userId', '==', userId).get();
    const user = result.docs.map((item) => ({
      ...item.data(),
      DocId: item.id
    }));
  
    return user;
  }


//get array of sugggestions from firestore where userid is not in following
export async function getSuggestions(userId,following){
    const result= await firebase.firestore().collection('users').limit(10).get();
    return result.docs.map((user)=>
    ({...user.data(),DocId:user.id}))
    .filter((profile)=>(profile.userId !== userId && !following.includes(profile.userId)));  
}

export async function updateLoggedinUserFollowing(loggedInUserDocId,profileId,isFollowingProfile){
  return firebase.firestore().collection('users').doc(loggedInUserDocId).update({
   following: isFollowingProfile
   ? firebase.firestore.FieldValue.arrayRemove(profileId)
   :firebase.firestore.FieldValue.arrayUnion(profileId)
 });
}
//updateFollowedUserFollowers()
export async function updateFollowedUserFollowers(profileDocId,userId,isUserFollowingProfile){
  return firebase.firestore().collection('users').doc(profileDocId).update({
    followers: isUserFollowingProfile
    ? firebase.firestore.FieldValue.arrayRemove(userId)
    : firebase.firestore.FieldValue.arrayUnion(userId)
  }) ;
}

export async function getPhotos(userId,following){
  const result = await firebase 
  .firestore()
  .collection('photos')
  .where('userId',"in",following)
  .get();
  const userFollowedPhotos = result.docs.map((photo)=>({
    ...photo.data(),
    DocId:photo.id
  }));
  const photosWithUserDetails = await Promise.all(
    userFollowedPhotos.map(async(photo)=>{
      let userLikedPhotos = false;
      if(photo.likes.includes(userId)){
        userLikedPhotos=true;
      }
      const user = await getUserByUserId(photo.userId);
      const{username}=user[0];
      return { username,...photo,userLikedPhotos};
    })
  );
  return photosWithUserDetails;
}
export async function updateLikes(userId,toggleLiked,DocId){
  await firebase
        .firestore()
        .collection('photos')
        .doc(DocId)
        .update({
            likes:toggleLiked ? firebase.firestore.FieldValue.arrayRemove(userId)
            : firebase.firestore.FieldValue.arrayUnion(userId)
        });
}

export async function getUserByUsername(username){
  const result = await firebase
  .firestore()
  .collection('users')
  .where('username','==',username)
  .get();
  return result.docs.map((item)=> ({...item.data(),DocId:item.id}));
}

export async function getUserPhotosByUserId(userId){
 const result = await firebase 
 .firestore()
 .collection('photos')
 .where('userId',"==",userId)
 .get();
  return result.docs.map((photo)=>({
   ...photo.data(),
   DocId:photo.id
 }));
}

export async function isUserFollowingProfile(loggedUserId,profileUserId){
  let isfollowing=false;
  const result = await firebase 
  .firestore()
  .collection('users')
  .where('userId','==',profileUserId)
  .where('followers','array-contains',loggedUserId)
  .get();
  if(result.docs.length){
    isfollowing=true;
  }  
  return isfollowing;  
}
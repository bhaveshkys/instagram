import useUser from '../../hooks/use-user';
import Suggestion from './suggestion'
import User from './user'

export default function Sidebar(){
    
    const {user:{fullName,username,userId,following,DocId}}=useUser();
    
    return(
        <div className="p-4 col-span-1">
           <User username={username} fullName={fullName}/>
           <Suggestion userId={userId} following={following} loggedInUserDocId={DocId} />
        </div>
    );
}
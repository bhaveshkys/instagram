import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';


const User =({username,fullName})=>
    !username || !fullName ?(
        <div>
            <Skeleton count={1} height={61}/>
        </div>
    ) : (
        <Link to={`/p/${username}`} 
            className="grid grid-cols-4 gap-4 mb-6 items-center">
            <div className="flex items-center justify-between col-span-1">
            <img 
                className="rounded-full h-10 w-10 flex justify-start mx-2 "
                src={`/images/avatars/${username}.jpg`}
                alt="pfp"
            />
            </div>
            <div className="col-span-3">
                <p className="font-bold text-sm">{username}</p>
                <p className="font-bold text-sm">{fullName}</p>

            </div>

        </Link>
    )
      
export default User;    
User.propTypes={
    username:PropTypes.string,
    fullName:PropTypes.string
};

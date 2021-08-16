import { Route, Redirect } from "react-router";
import * as ROUTES from '../constants/routes'

export default function IsUserLoggedIn({user,children,...rest}){
    return(
        <Route
            {...rest}
            render={({location})=>{
                if(user){
                    return children;
                }
                if(!user){
                    return(
                        <Redirect
                            to={{
                                pathname: ROUTES.LOGIN,
                                state:{from :location}
                            }}
                        />
                    );
                }
                return null;
            }}
        />
    );
}
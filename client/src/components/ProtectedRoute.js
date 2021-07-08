import React from 'react';
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, userRole, ...rest }) => {
console.log("auth:" + userRole)
    return(
        <Route {...rest} render={(props) => (
            userRole === 'admin'
                ? <Component {...props} />
                : <Redirect to='/' />
        )} />
    )
}

export default ProtectedRoute;
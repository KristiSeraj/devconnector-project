import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom'

function PrivateRoute({ element: Component, ...rest}) {
    const { isAuthenticated, loading } = useSelector((state) => state.auth);

    return (
        !isAuthenticated &&  !loading ? (<Navigate to='/login' />) : (rest.children)
    )
}
 
export default PrivateRoute;
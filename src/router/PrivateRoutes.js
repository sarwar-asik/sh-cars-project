import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/ProvideContext';

const PrivateRoutes = ({children}) => {
    const {user,loader} = useContext(AuthContext)
    const location = useLocation();
if(loader){
    return <h1 className='text-5xl'> LOADING......</h1>
}

    if(user){
        return children
    }
    return <Navigate state={{from:location}}
    replace
    ></Navigate>
            
     
};

export default PrivateRoutes;
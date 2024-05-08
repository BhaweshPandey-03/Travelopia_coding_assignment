import React from 'react'
import { Navigate } from 'react-router-dom';

const PrivateRoute: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const isAuth = localStorage.getItem('isAuth')
    console.log(isAuth, "private route")
    return (
        isAuth ? children : <Navigate to='/login' />
    )
}

export default PrivateRoute
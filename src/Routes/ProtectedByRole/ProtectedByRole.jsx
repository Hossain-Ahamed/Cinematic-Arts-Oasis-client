import React from 'react';
import useProfile from '../../Hooks/useProfile';
import LoadingPage from '../../Pages/LoadingPage/LoadingPage/LoadingPage';
import { Navigate } from 'react-router-dom';

const ProtectedByRole = ({ allowedRoles, children }) => {
    const { role, profileLoading } = useProfile();
   

    if (profileLoading) {
        return <LoadingPage />
    }

    if (allowedRoles.includes(role)) {
        return <>{children}</>
    }

    return <Navigate to="/" replace />
};

export default ProtectedByRole;
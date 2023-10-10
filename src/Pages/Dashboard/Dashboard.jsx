import React from 'react';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <>
           <Outlet></Outlet>
        </>
    );
};

export default Dashboard;
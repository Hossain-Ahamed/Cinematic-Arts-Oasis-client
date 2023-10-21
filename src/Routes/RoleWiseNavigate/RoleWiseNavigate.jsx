import React from 'react';
import useProfile from '../../Hooks/useProfile';
import useAuthProvider from '../../Hooks/useAuthProvider';
import AdminHome from '../../Pages/Dashboard/Admin/AdminHome/AdminHome';
import InstructorHome from '../../Pages/Dashboard/Instructor/InstructorHome/InstructorHome';
import StudentHome from '../../Pages/Dashboard/Student/StudentHome/StudentHome';

const RoleWiseNavigateToDashboardHome = () => {
    const { role } = useProfile();
    const { provideSignOut } = useAuthProvider();
    if (role === "Admin") {
        return <AdminHome />
    } else if (role === "Instructor") {
        return <InstructorHome />
    } else if (role === "Student") {
        return <StudentHome />
    } else {
        return provideSignOut();
    }

};

export default RoleWiseNavigateToDashboardHome;
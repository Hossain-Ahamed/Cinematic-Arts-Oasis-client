import React from 'react';
import useProfile from '../../Hooks/useProfile';
import useAuthProvider from '../../Hooks/useAuthProvider';
import AdminHome from '../../Pages/Dashboard/Admin/AdminHome/AdminHome';
import InstructorHome from '../../Pages/Dashboard/Instructor/InstructorHome/InstructorHome';
import StudentHome from '../../Pages/Dashboard/Student/StudentHome/StudentHome';
import StudentAllClass from '../../Pages/Dashboard/Student/StudentClass/StudentAllClass/StudentAllClass';
import ManageClass from '../../Pages/Dashboard/Common/ManageClass/ManageClass';

const RoleWiseNavigateToDashboardHome = () => {
    const { role } = useProfile();
    const { provideSignOut } = useAuthProvider();
    if (role === "Admin") {
        return <AdminHome />
    } else if (role === "Instructor") {
        return <ManageClass />
    } else if (role === "Student") {
        return <StudentAllClass />
    } else {
        return provideSignOut();
    }

};

export default RoleWiseNavigateToDashboardHome;
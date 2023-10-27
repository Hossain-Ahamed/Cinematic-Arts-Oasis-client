import {
    createBrowserRouter,

} from "react-router-dom";
import Main from "../../Layout/Main/Main";
import PreventLogIn from "../PreventLogin/PreventLogIn";
import Login from "../../Pages/Main_Layout_Pages/LoginSystem/Login/Login";
import SignUp from "../../Pages/Main_Layout_Pages/LoginSystem/SignUp/SignUp";
import Home from "../../Pages/Main_Layout_Pages/Home/Home";
import UpdateProfile from "../../Pages/Main_Layout_Pages/LoginSystem/UpdateProfile/UpdateProfile";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Dashboard from "../../Layout/Dashboard/Dashboard";
import NoProfileWarning from "../NoProfileWarning/NoProfileWarning";
import ProtectedByRole from "../ProtectedByRole/ProtectedByRole";
import AdminHome from "../../Pages/Dashboard/Admin/AdminHome/AdminHome";
import StudentHome from "../../Pages/Dashboard/Student/StudentHome/StudentHome";
import Forgetpassword from "../../Pages/Main_Layout_Pages/LoginSystem/OtherSignInMethod/Forgetpassword";
import Profile from "../../Pages/Main_Layout_Pages/Profile/Profile";
import Instructors from "../../Pages/Main_Layout_Pages/Instructor/Instructor";
import ReleaseNote from "../../Pages/ReleaseNote/ReleaseNote";
import RoleWiseNavigateToDashboardHome from "../RoleWiseNavigate/RoleWiseNavigate";
import AllUsers from "../../Pages/Dashboard/Admin/Handleusers/AllUsers";
import UpdateUserByAdmin from "../../Pages/Dashboard/Admin/Handleusers/UpdateUserByAdmin";
import InstructorHome from "../../Pages/Dashboard/Instructor/InstructorHome/InstructorHome";
import AddClass from "../../Pages/Dashboard/Instructor/AddClass/AddClass";
import Followers from "../../Pages/Dashboard/Instructor/Followers/Followers";
import Classes from "../../Pages/Main_Layout_Pages/Classes/Classes";
import ClassDetailView from "../../Pages/Main_Layout_Pages/Classes/ClassDetailView/ClassDetailView";
import InstructorDetailView from "../../Pages/Main_Layout_Pages/Instructor/InstructorDetailView/InstructorDetailView";
import ManageClass from "../../Pages/Dashboard/Common/ManageClass/ManageClass";
import AdminInstructorClassDetailView from "../../Pages/Dashboard/Common/AdminInstructorClassDetailView/AdminInstructorClassDetailView";
import Cart from "../../Pages/Dashboard/Student/Cart/Cart";
import Payment from "../../Pages/Dashboard/Student/Payment/Payment";
import Followings from "../../Pages/Dashboard/Student/Followings/Followings";
import MyPaymentHistory from "../../Pages/Dashboard/Student/MyPaymentHistory/MyPaymentHistory";
import StudentAllClass from "../../Pages/Dashboard/Student/StudentClass/StudentAllClass/StudentAllClass";
import StudentClassDetail from "../../Pages/Dashboard/Student/StudentClass/StudentClassDetail/StudentClassDetail";
import UserDetail from "../../Pages/Dashboard/Admin/UserDetail/UserDetail";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/login",
                element: <PreventLogIn><Login /></PreventLogIn>
            },
            {
                path: "/sign-up",
                element: <PreventLogIn><SignUp /></PreventLogIn>
            },
            {
                path: "/forget-password",
                element: <PreventLogIn><Forgetpassword /></PreventLogIn>
            },
            {
                path: "/update-profile",
                element: <PrivateRoute> <UpdateProfile /></PrivateRoute>
            },

            {
                path: "/classes",
                element: <Classes />
            },
            {
                path: "/classes/:classID",
                element: <ClassDetailView />
            },
            {
                path: "/instructors",
                element: <Instructors />
            },
            {
                path: "/instructors/:insID",
                element: <InstructorDetailView />
            },


        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><NoProfileWarning><Dashboard /></NoProfileWarning></PrivateRoute>,
        children: [
            {
                path: "/dashboard",
                element: <RoleWiseNavigateToDashboardHome />
            },
            {
                path: "profile",
                element: <Profile />
            },
            // admin 
            {
                path: "admin",
                element: <ProtectedByRole allowedRoles={["Admin"]}><AdminHome /></ProtectedByRole>
            },
            {
                path: "all-users",
                element: <ProtectedByRole allowedRoles={["Admin"]}><AllUsers /></ProtectedByRole>
            },
            {
                path: "all-users/:userID",
                element: <ProtectedByRole allowedRoles={["Admin"]}><UserDetail /></ProtectedByRole>
            },
            {
                path: "all-users/update-user-profile",
                element: <ProtectedByRole allowedRoles={["Admin"]}><UpdateUserByAdmin /></ProtectedByRole>
            },
            {
                path: "manage-classes",
                element: <ProtectedByRole allowedRoles={["Admin"]}><ManageClass /></ProtectedByRole>
            },
            {
                path: "manage-classes/:classID",
                element: <ProtectedByRole allowedRoles={["Admin"]}><AdminInstructorClassDetailView /></ProtectedByRole>
            },


            // student 
            {
                path: "student",
                element: <ProtectedByRole allowedRoles={["Student"]}><StudentHome /></ProtectedByRole>
            },
            {
                path: "carts",
                element: <ProtectedByRole allowedRoles={["Student"]}><Cart /></ProtectedByRole>
            },
            {
                path: "/dashboard/payment/:cartID",
                element: <ProtectedByRole allowedRoles={["Student"]}><Payment /></ProtectedByRole>
            },
            {
                path: "classes",
                element: <ProtectedByRole allowedRoles={["Student"]}><StudentAllClass /></ProtectedByRole>
            },
            {
                path: "classes/:classID",
                element: <ProtectedByRole allowedRoles={["Student"]}><StudentClassDetail /></ProtectedByRole>
            },
            {
                path: "following",
                element: <ProtectedByRole allowedRoles={["Student"]}><Followings /></ProtectedByRole>
            },
            {
                path: "my-payment-history",
                element: <ProtectedByRole allowedRoles={["Student"]}><MyPaymentHistory /></ProtectedByRole>
            },



            // instructor 
            {
                path: "instructor",
                element: <ProtectedByRole allowedRoles={["Instructor"]}><InstructorHome /></ProtectedByRole>
            },
            {
                path: "add-class",
                element: <ProtectedByRole allowedRoles={["Instructor"]}><AddClass /></ProtectedByRole>
            },
            {
                path: "my-classes",
                element: <ProtectedByRole allowedRoles={["Instructor"]}><ManageClass /></ProtectedByRole>
            },
            {
                path: "my-classes/:classID",
                element: <ProtectedByRole allowedRoles={["Instructor"]}><AdminInstructorClassDetailView /></ProtectedByRole>
            },
            {
                path: "followers",
                element: <ProtectedByRole allowedRoles={["Instructor"]}><Followers /></ProtectedByRole>
            },

            //common

        ]
    },
    {
        path: "/release-note/ce551b5c3f7f8acfc3c2bff12d51f0c523a6028aaba08f11eebece3d28c-Update-new-release-note-8365e2654e2a6aa1016e3dea4ce703be55cfc7ff5f31021203bb02c1565e3038707618abd5805271a90f6c7fb2be8ab963acaa49edb4f71777441865314e8c19dd61d510e9273bfbffa6c8888c7bd8a435567b67c2efb08a783e73bcae27b6ba0bdbe",
        element: <ReleaseNote />
    }
])

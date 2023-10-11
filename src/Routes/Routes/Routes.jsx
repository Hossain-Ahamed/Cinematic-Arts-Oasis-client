import {
    createBrowserRouter,

} from "react-router-dom";
import Main from "../../Layout/Main/Main";
import LoadingPage from "../../Pages/LoadingPage/LoadingPage/LoadingPage";
import PreventLogIn from "../PreventLogin/PreventLogIn";
import Login from "../../Pages/Main_Layout_Pages/LoginSystem/Login/Login";
import SignUp from "../../Pages/Main_Layout_Pages/LoginSystem/SignUp/SignUp";
import Home from "../../Pages/Main_Layout_Pages/Home/Home";
import UpdateProfile from "../../Pages/Main_Layout_Pages/LoginSystem/UpdateProfile/UpdateProfile";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Dashboard from "../../Pages/Dashboard/Dashboard";
import NoProfileWarning from "../NoProfileWarning/NoProfileWarning";
import ProtectedByRole from "../ProtectedByRole/ProtectedByRole";
import AdminHome from "../../Pages/Dashboard/Admin/AdminHome/AdminHome";
import StudentHome from "../../Pages/Dashboard/Student/StudentHome/StudentHome";
import Classes from "../../Pages/Main_Layout_Pages/Classes/Classes";
import Forgetpassword from "../../Pages/Main_Layout_Pages/LoginSystem/OtherSignInMethod/Forgetpassword";
import Profile from "../../Pages/Main_Layout_Pages/Profile/Profile";
import Instructors from "../../Pages/Main_Layout_Pages/Instructor/Instructor";


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
                element: <Classes />
            },
            {
                path: "/instructors",
                element: <Instructors />
            },
            {
                path: "/instructors/:instrucotrID",
                element: <Instructors />
            },
         
         
        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><NoProfileWarning><Dashboard /></NoProfileWarning></PrivateRoute>,
        children: [
            {
                path: "profile",
                element: <Profile />
            },
            // admin 
            {
                path: "admin",
                element: <ProtectedByRole allowedRoles={["Admin"]}><AdminHome/></ProtectedByRole>
            },


            // student 
            {
                path: "student",
                element: <ProtectedByRole allowedRoles={["Student"]}><StudentHome/></ProtectedByRole>
            },



            // instructor 
            {
                path: "instructor",
                element: <ProtectedByRole allowedRoles={["Instructor"]}><StudentHome/></ProtectedByRole>
            },

        ]
    },
])
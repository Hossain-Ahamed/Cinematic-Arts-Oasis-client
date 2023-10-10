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
                path: "/profile",
                element: <PrivateRoute> <UpdateProfile /></PrivateRoute>
            },
            {
                path: "/classes",
                element: <Classes />
            },
         
        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><NoProfileWarning><Dashboard /></NoProfileWarning></PrivateRoute>,
        children: [
            // admin 
            {
                path: "admin",
                element: <ProtectedByRole allowedRoles={["admin"]}><AdminHome/></ProtectedByRole>
            },


            // student 
            {
                path: "student",
                element: <ProtectedByRole allowedRoles={["student"]}><StudentHome/></ProtectedByRole>
            },

        ]
    },
]);
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


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main/>,
        children :[
            {
                path : "/",
                element : <Home/>
            },
            {
                path : "/login",
                element : <PreventLogIn><Login/></PreventLogIn>
            },
            {
                path : "/sign-up",
                element : <PreventLogIn><SignUp/></PreventLogIn>
            },
            {
                path : "/update-profile",
                element : <UpdateProfile/>
            },
            {
                path : "/classes",
                element : <LoadingPage/>
            },
            {
                path : "/classes",
                element : <LoadingPage/>
            },
            {
                path : "/classes",
                element : <LoadingPage/>
            },
            {
                path : "/classes",
                element : <LoadingPage/>
            },
            {
                path : "/classes",
                element : <LoadingPage/>
            },
            {
                path : "/classes",
                element : <LoadingPage/>
            },
        ]
    },
]);
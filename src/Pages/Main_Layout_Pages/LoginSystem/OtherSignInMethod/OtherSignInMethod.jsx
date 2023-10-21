import React from 'react';
import google from '../../../../assets/images/icon/google.svg';
import useAuthProvider from '../../../../Hooks/useAuthProvider';
import { BsGithub } from 'react-icons/bs';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import useProfile from '../../../../Hooks/useProfile';
const OtherSignInMethod = () => {
    const { provideSignInWithGoogle, provideSignInWithGitHub, setLoading } = useAuthProvider();
    const {profileRefetch} = useProfile();
    const axiosSecure = useAxiosSecure();



    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const handleGoogleLogin = () => {
        provideSignInWithGoogle()
            .then(result => {
                postSignInFunctions(result?.user);

            }).catch(e => { setLoading(false) })
    }



    const handleGitHubLogin = () => {
        provideSignInWithGitHub()
            .then(result => {
                postSignInFunctions(result?.user);
            }).catch(e => { setLoading(false) })
    }

    const postSignInFunctions = (result) => {
        profileRefetch();
        // const saveduser = {
        //     name: result?.displayName,
        //     email: result.email,
        //     photoURL: result?.photoURL,
        //     phone: result?.phoneNumber,
        //     firebase_UID: result?.uid,


        // }



        // axiosSecure.post('/sign-in-upload-data', saveduser)
        //     .then(data => {
        //         navigate(from, { replace: true });
        //     }).catch(e => console.error(e))

    }
    return (
        <div className='mt-3'>
            <button onClick={handleGoogleLogin} className="w-full px-5 py-1.5 text-lg font-semibold flex justify-center items-center gap-3 border border-gray-500/50 rounded-2xl ">
                <img src={google} alt="Google" /><span>Sign in with Google</span>
            </button>
            <button onClick={handleGitHubLogin} className="mt-2 w-full px-5 py-1.5 text-lg font-semibold bg-gray-900 text-white flex justify-center items-center gap-3 border border-gray-500/50 rounded-2xl ">
                <BsGithub className='text-xl' /><span>Sign in with Github</span>
            </button>

        </div>
    );
};

export default OtherSignInMethod;
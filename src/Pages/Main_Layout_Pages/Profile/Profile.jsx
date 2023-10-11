import React from 'react';
import SetTitle from '../../Shared/SetTtitle/SetTitle';
import useProfile from '../../../Hooks/useProfile';
import LoadingPage from '../../LoadingPage/LoadingPage/LoadingPage';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { profile, profileLoading, role } = useProfile();

    const navigate = useNavigate();
    if (profileLoading) {
        return <LoadingPage />
    }

    return (
        <>
            <SetTitle title={`${profile?.displayName}`} />
            <SectionTitle h1=" PROFILE" />
            <div className='max-w-5xl mx-auto min-h-screen' >
                {/* image  */}

                <div className="flex items-center justify-center max-w-[300px] mx-auto relative">
                    <label className="flex flex-col items-center justify-center w-44 h-44 border-2 border-gray-300 border-dashed rounded-lg  bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">

                        {
                            profile?.photoURL ?
                                <img src={profile?.photoURL} alt="" className='w-full h-full rounded' />
                                :
                                <>
                                    <span className="font-medium text-gray-100 ">
                                        {
                                            profile?.displayName &&
                                            profile?.displayName.split(" ").map((i) => i.charAt(0).toUpperCase()).join("")
                                        }

                                    </span>
                                </>


                        }



                    </label>
                </div>
                <div className="mt-6 grid gap-6 mb-6 md:grid-cols-2">



                    {/* name  */}
                    <div>
                        <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <p className="bg-gray-50 border-b border-gray-300 text-gray-900 text-sm  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" >{profile?.name}</p>
                    </div>
                    <div>
                        <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role</label>
                        <p className="bg-gray-50 border-b border-gray-300 text-gray-900 text-sm  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" >{role}</p>
                    </div>


                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                        <p className="bg-gray-50 border-b border-gray-300 text-gray-900 text-sm  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" >{profile?.email}</p>
                    </div>

                    {/* phone  */}
                    <div>
                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
                        <p className="bg-gray-50 border-b border-gray-300 text-gray-900 text-sm  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" >{profile?.phone}</p>
                    </div>

                    {/* institute name  */}
                    <div>
                        <label htmlFor="Institute-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Institute name </label>
                        <p className="bg-gray-50 border-b border-gray-300 text-gray-900 text-sm  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" >{profile?.institute}</p>

                    </div>

                    {/* gender  */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender </label>

                        <p className="bg-gray-50 border-b border-gray-300 text-gray-900 text-sm  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" >{profile?.gender}</p>
                    </div>
                </div>
                <div className="mb-6">
                    <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                    <p className="bg-gray-50 border-b border-gray-300 text-gray-900 text-sm  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" >{profile?.address}</p>
                </div>
                <div className="mb-6 flex justify-center">
                    <button onClick={() => navigate('/update-profile')} className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update Profile</button>
                </div>
            </div >


        </>
    );
};

export default Profile;
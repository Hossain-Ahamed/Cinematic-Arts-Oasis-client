import React from 'react';
import { Link } from 'react-router-dom';

const UserDetail_Profile = ({ profile }) => {
    return (
        <div className=" w-full flex flex-col  bg-white border border-gray-200 rounded-none md:rounded-lg shadow md:flex-row  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={profile?.photoURL} alt={profile?.name} />
            <div className="flex flex-col items-start p-4 leading-normal flex-grow">
                <div className='w-full flex justify-between items-center '>

                    <div>
                        <Link to={`/instructors/${profile?._id}`} className='cursor-pointer hover:text-blue-700'>
                            <h5 className="mb-0 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{profile?.name} <span className='text-sm font-normal text-gray-500 dark:text-gray-300 text-end'>&#91;{profile?.gender}-{profile?.role}&#93;</span></h5>
                        </Link>
                        <p className="mb-3 text-sm font-semibold text-gray-500 dark:text-gray-400 leading-none cursor-pointer ">@{profile?._id.slice(-6)} </p>

                    </div>
    
                </div>



                <p className="mb-1 font-normal text-blue-700 dark:text-blue-400 leading-none hover:cursor-pointer">{profile?.phone} </p>
                <p className="mb-3 font-normal text-blue-700 dark:text-blue-400 leading-none hover:cursor-pointer">{profile?.email} </p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-none hover:cursor-pointer">UID: {profile?.firebase_UID} </p>
                <p className="mb-1 font-medium text-gray-600 dark:text-gray-400 leading-none ">From: {profile?.institute} </p>
                <p className="mb-1 font-medium text-gray-600 dark:text-gray-400 leading-none ">Address: {profile?.address} </p>

            </div>



        </div>
    );
};

export default UserDetail_Profile;
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FcLike } from 'react-icons/fc';
import { PiHeartStraight } from 'react-icons/pi';
const Instructorcard = ({ data, role, handleFollow, profile }) => {
    const location = useLocation();
    return (
        <>
            <div className="  w-80 h-48 text-sm text-gray-500  bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 dark:bg-gray-800 dark:border-gray-600">
                <div className="p-3">
                    <div className="flex items-center justify-between mb-2">

                        <img className="w-10 h-10 rounded-full" src={data?.photoURL} alt="Jese Leos" />
                        {
                            role === "Student" &&
                            <div>
                                <button

                                    type="button"
                                    className="text-3xl">
                                    {
                                        profile?.following && Array.isArray(profile?.following) && profile?.following.includes(data?._id) ?

                                            <FcLike onClick={() => handleFollow(data?._id, "unfollow")} />
                                            :
                                            <PiHeartStraight onClick={() => handleFollow(data?._id, "follow")} />
                                    }
                                </button>
                            </div>
                        }
                    </div>
                    <p className="text-base font-semibold leading-none text-gray-900 dark:text-white">
                        {data?.name}
                    </p>
                    <p className=" text-sm font-normal">
                        <a href="#" className="hover:underline">{data?.email}</a>
                    </p>
                    <p className="mb-4 text-sm">{data?.phone}</p>
                    <ul className="flex text-sm justify-between ">
                        {
                            ['/dashboard/all-users/', '/dashboard/following'].some(path => location.pathname.includes(path)) || <>
                                <li className="mr-2">
                                    <a href="#" className="hover:underline">
                                        <span>Instructor for: </span>
                                        <span className="font-semibold text-gray-900 dark:text-white">{data?.classInfo && Array.isArray(data?.classInfo) ? data?.classInfo.length : 0}</span> class
                                    </a>
                                </li>
                            </>
                        }

                        <li>
                            <Link to={`/instructors/${data?._id}`} className="hover:underline hover:text-blue-600 flex justify-around items-center">
                                <span className="font-semibold text-blue-900 dark:text-white">See Detail</span>
                                <svg className="ml-1 flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14.43 18.82C14.24 18.82 14.05 18.75 13.9 18.6C13.61 18.31 13.61 17.83 13.9 17.54L19.44 12L13.9 6.46C13.61 6.17 13.61 5.69 13.9 5.4C14.19 5.11 14.67 5.11 14.96 5.4L21.03 11.47C21.32 11.76 21.32 12.24 21.03 12.53L14.96 18.6C14.81 18.75 14.62 18.82 14.43 18.82Z" fill="currentColor" />
                                    <path d="M20.33 12.75H3.5C3.09 12.75 2.75 12.41 2.75 12C2.75 11.59 3.09 11.25 3.5 11.25H20.33C20.74 11.25 21.08 11.59 21.08 12C21.08 12.41 20.74 12.75 20.33 12.75Z" fill="currentColor" />
                                </svg>

                            </Link>
                        </li>
                    </ul>
                </div>

            </div>
        </>
    );
};

export default Instructorcard;
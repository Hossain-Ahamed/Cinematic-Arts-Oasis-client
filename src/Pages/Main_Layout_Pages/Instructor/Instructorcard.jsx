import React from 'react';
import { Link } from 'react-router-dom';
import {  FcLike } from 'react-icons/fc';
import { PiHeartStraight } from 'react-icons/pi';
const Instructorcard = ({ data, role, handleFollow, profile }) => {

    return (
        <>
            <div className="  w-80 h-48 text-sm text-gray-500  bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 dark:bg-gray-800 dark:border-gray-600">
                <div className="p-3">
                    <div className="flex items-center justify-between mb-2">
                       
                            <img className="w-10 h-10 rounded-full" src={data?.photoURL} alt="Jese Leos" />
                       
                        <div>
                            <button 
                           
                            type="button"
                             className="text-3xl">
                                {
                                    profile?.following && Array.isArray(profile?.following) && profile?.following.includes(data?._id) ?

                                    <FcLike  onClick={()=>handleFollow(data?._id, "unfollow")} />
                                    :
                                    <PiHeartStraight  onClick={()=>handleFollow(data?._id, "follow")} />
                                }
                             </button>
                        </div>
                    </div>
                    <p className="text-base font-semibold leading-none text-gray-900 dark:text-white">
                        {data?.name}
                    </p>
                    <p className="mb-3 text-sm font-normal">
                        <a href="#" className="hover:underline">{data?.email}</a>
                    </p>
                    <p className="mb-4 text-sm">{data?.phone}</p>
                    <ul className="flex text-sm justify-between px-2">
                        <li className="mr-2">
                            <a href="#" className="hover:underline">
                                <span className="font-semibold text-gray-900 dark:text-white">{data?.classInfo && Array.isArray(data?.classInfo) ? data?.classInfo.length : 0}</span>
                                <span className='pl-1'>Class</span>
                            </a>
                        </li>
                        <li>
                            <Link to={data?._id} className="hover:underline hover:text-blue-600">
                                <span className="font-semibold text-blue-900 dark:text-white">See Detail</span>
                               
                            </Link>
                        </li>
                    </ul>
                </div>

            </div>
        </>
    );
};

export default Instructorcard;
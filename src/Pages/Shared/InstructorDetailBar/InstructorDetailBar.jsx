import React from 'react';
import useProfile from '../../../Hooks/useProfile';
import { Link, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { FcLike } from 'react-icons/fc';
import { PiHeartStraight } from 'react-icons/pi';
const InstructorDetailbar = ({ InstructorInfo }) => {
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const { role, profile, profileRefetch } = useProfile();

    const handleFollow = (insID, type) => {
        if (!role) {
            Swal.fire(
                'No Profile',
                'Your must Login .',
                'warning'
            )

            navigate("/login", { replace: true })
        } else {

            if (role !== "Student") {
                Swal.fire(
                    'Unauthorized',
                    'Only student can follow',
                    'warning'
                )

            } else {

                const data = {
                    insID: insID,
                    type: type,
                    _id: profile?._id
                }

                axiosSecure.patch('/followings', data)
                    .then(data => {
                        profileRefetch();
                        // toast.success()
                    })
                    .catch(e => console.error(e))


            }
        }
    }
    return (
        <div className=" w-full flex flex-col  bg-white border border-gray-200 rounded-none md:rounded-lg shadow md:flex-row  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={InstructorInfo?.photoURL} alt={InstructorInfo?.name} />
            <div className="flex flex-col items-start p-4 leading-normal flex-grow">
                <div className='w-full flex justify-between items-center '>

                    <div>
                        <Link to={`/instructors/${InstructorInfo?._id}`} className='cursor-pointer hover:text-blue-700'>
                            <h5 className="mb-0 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{InstructorInfo?.name} <span className='text-sm font-normal text-gray-500 dark:text-gray-300 text-end'>&#91;Instructor&#93;</span></h5>
                        </Link>
                        <p className="mb-3 text-sm font-semibold text-gray-500 dark:text-gray-400 leading-none cursor-pointer ">@{InstructorInfo?._id.slice(-6)} </p>

                    </div>
                    <button

                        type="button"
                        className="text-3xl">
                        {
                            profile?.following && Array.isArray(profile?.following) && profile?.following.includes(InstructorInfo?._id) ?

                                <FcLike onClick={() => handleFollow(InstructorInfo?._id, "unfollow")} />
                                :
                                <PiHeartStraight onClick={() => handleFollow(InstructorInfo?._id, "follow")} />
                        }
                    </button>
                </div>



                <p className="mb-1 font-normal text-blue-700 dark:text-blue-400 leading-none hover:cursor-pointer">{InstructorInfo?.phone} </p>
                <p className="mb-3 font-normal text-blue-700 dark:text-blue-400 leading-none hover:cursor-pointer">{InstructorInfo?.email} </p>
                <p className="mb-1 font-medium text-gray-600 dark:text-gray-400 leading-none ">From: {InstructorInfo?.institute} </p>

            </div>



        </div>
    );
};

export default InstructorDetailbar;
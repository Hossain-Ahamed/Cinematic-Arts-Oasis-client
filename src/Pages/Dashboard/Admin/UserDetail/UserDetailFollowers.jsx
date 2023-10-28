import React from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';

const UserDetailFollowers = ({ followers }) => {
    return (
        <>
          <SectionTitle h3={"Followers "}/>
            <div className=' flex justify-center items-center flex-wrap gap-5 pb-20'>
                {
                    followers && Array.isArray(followers) &&
                    followers.map((Student, _idx) => <Link to={`/dashboard/all-users/${Student?._id}`} key={_idx} className="  w-[315px] max-w-full h-fit text-sm text-gray-500  bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-300 dark:bg-gray-800 dark:border-gray-600">

                        <div className="flex flex-col items-start justify-between mb-2 pt-4 px-3">
                            <h5 className="mb-0 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{Student?.name}</h5>
                            <p className="mb-3 text-sm font-semibold text-gray-500 dark:text-gray-400 leading-none cursor-pointer ">@{Student?._id.slice(-6)} </p>
                            <p className="mb-0 font-medium text-[16px] leading-none hover:cursor-pointer">E-mail: <span className='text-base font-light hover:underline'> {Student?.email} </span></p>
                            <p className="mb-0 font-medium text-[16px] leading-none hover:cursor-pointer">Phone: <span className='text-base font-light hover:underline'> {Student?.phone} </span></p>
                            <p className="mb-0 font-medium text-[16px] leading-none hover:cursor-pointer">UID: <span className='text-base font-light hover:underline'> {Student?.firebase_UID} </span></p>
                        </div>


                    </Link>
                    )
                }
            </div>
        </>
    );
};

export default UserDetailFollowers;
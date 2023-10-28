import React from 'react';
import { Link } from 'react-router-dom';

const CourseData_AdminInstructorClassDetailView = ({ courseData, lengthOFStudents, role }) => {
    return (
        <div className=" max-w-screen md:max-w-full flex flex-col  bg-white border border-gray-200 rounded-none md:rounded-lg shadow md:flex-row  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <img className="object-cover  w-full rounded-t-lg h-72 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={courseData?.photoURL} alt={courseData?.name} />
            <div className="flex flex-col items-start p-4 leading-normal flex-grow">
                <div className='w-full flex justify-between items-center '>

                    <div>

                        <h5 className="mb-0 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{courseData?.className}</h5>

                        <p className="mb-3 text-sm font-semibold text-gray-500 dark:text-gray-400 leading-none cursor-pointer ">#{courseData?._id.slice(-6)} </p>

                    </div>

                </div>



                <p className="mb-1 font-medium text-[16px] leading-none hover:cursor-pointer">Instructor : <span className='text-base font-light'> {courseData?.name}</span></p>
                <p className="mb-3 font-medium text-[16px] leading-none hover:cursor-pointer">E-mail: <span className='text-base font-light hover:underline'> {courseData?.email} </span></p>
                <p className="mb-1 font-medium text-gray-600 dark:text-gray-300 leading-none ">Total Stuents: {lengthOFStudents} </p>
                <p className="mb-1 font-medium text-gray-600 dark:text-gray-300 leading-none ">Course Price: {courseData?.CoursePrice} </p>
                <p className="mb-1 font-medium text-gray-600 dark:text-gray-300 leading-none ">Available seats: {courseData?.availableSeats} </p>
                <p className="mb-1 font-medium text-gray-600 dark:text-gray-300 leading-none ">Video URL: <Link to={courseData?.videoURL} target='_blank' className='hover:text-blue-600 cursor-pointer'> {courseData?.videoURL} </Link></p>
                <p className="mb-1 font-medium text-gray-600 dark:text-gray-300 leading-none ">Status:  <span
                    className={` ${courseData?.status === "Denied" ?
                        " text-red-500"
                        :
                        courseData?.status === "Approved"
                            ?
                            " text-green-500"
                            :
                            " text-yellow-500"}`}
                >
                    {courseData?.status}
                </span>
                </p>
                {
                    role === "Instructor" &&  courseData?.status === "Pending" &&

                    <Link to={'edit'} className="mt-3 flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <span>
                            Update
                        </span>
                        <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </Link>
                }
            </div>


        </div>
    );
};

export default CourseData_AdminInstructorClassDetailView;
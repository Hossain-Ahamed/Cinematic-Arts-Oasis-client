import React from 'react';
import { Link } from 'react-router-dom';

const ClassCard = ({data}) => {

  
    return (
        <div  className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

        <img className="p-8 rounded-t-lg w-[380px] h-[242px] object-cover" src={data?.photoURL} alt="product image" />

        <div className="px-5 pb-5">

            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white" aria-label='course name' title='course name'>{data?.className}</h5>
            <div className="flex items-center mt-2.5 mb-5">
                <span aria-label='isntructor name' title='instructor name'>{data?.name}</span>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">Available Seat:{data?.availableSeats}</span>
            </div>
            <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">${data?.CoursePrice}</span>
                <div className='flex justify-between items-center flex-wrap gap-3'>
                    <button 
                    disabled={data?.availableSeats===0}
                    className={`text-white rounded-lg text-sm px-5 py-2.5 text-center ${data?.availableSeats===0 ? "bg-red-500 disabled:cursor-not-allowed" : "bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"}`}>
                     
                            Add to Cart
                    
                    </button>
                    <Link to={`${data?._id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Read more
                        <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    </div>

    );
};

export default ClassCard;
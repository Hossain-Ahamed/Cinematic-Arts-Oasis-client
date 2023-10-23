import React from 'react';
import { Link } from 'react-router-dom';


const ClassCard = ({ data, role, handleAddToCart, items }) => {

    return (
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">



            {/* The button to open modal */}
            <label htmlFor={data?._id} className='relative' title={data?.videoURL ? "click to see video" : " "}>
                {
                    data?.videoURL && <span className='absolute top-10 right-12 cursor-pointer' >
                        <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.53 20.4201H6.21C3.05 20.4201 2 18.3201 2 16.2101V7.79008C2 4.63008 3.05 3.58008 6.21 3.58008H12.53C15.69 3.58008 16.74 4.63008 16.74 7.79008V16.2101C16.74 19.3701 15.68 20.4201 12.53 20.4201Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M19.52 17.0999L16.74 15.1499V8.83989L19.52 6.88989C20.88 5.93989 22 6.51989 22 8.18989V15.8099C22 17.4799 20.88 18.0599 19.52 17.0999Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M11.5 11C12.3284 11 13 10.3284 13 9.5C13 8.67157 12.3284 8 11.5 8C10.6716 8 10 8.67157 10 9.5C10 10.3284 10.6716 11 11.5 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>

                    </span>
                }


                <img className="p-6 rounded-lg w-[380px] h-[242px] object-cover " src={data?.photoURL} alt="product image" />
            </label>

            {/* Put this part before </body> tag */}
            <input type="checkbox" id={data?._id} className="modal-toggle" />
            {
                data?.videoURL && <div className="modal">
                    <div className="modal-box w-fit max-w-5xl">
                        <iframe className='w-screen max-w-lg h-[300px]' src={data?.videoURL} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                    </div>
                    <label className="modal-backdrop" htmlFor={data?._id}>Close</label>
                </div>
            }

            <div className="px-5 pb-5">

                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white" aria-label='course name' title='course name'>{data?.className}</h5>
                <div className="flex items-center mt-2.5 mb-5">
                    <span aria-label='isntructor name' title='instructor name' className=' text-sm  '>By <span className='text-gray-600 hover:cursor-pointer font-semibold'>@{data?.name}</span></span>
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">Available Seat:{data?.availableSeats}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">${data?.CoursePrice}</span>
                    <div className='flex justify-between items-center flex-wrap gap-3'>
                        <button
                            disabled={data?.availableSeats === 0}
                            title={role !== "Student" ? "Only student can Purchase" : data?.availableSeats === 0 ? "No seat Availabale " : "Add to cart"}
                            onClick={() => { handleAddToCart(data?._id) }}
                            className={`text-white rounded-lg text-sm px-5 py-2.5 text-center font-medium ${data?.availableSeats === 0 ? "bg-red-500 disabled:cursor-not-allowed" : "bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300   dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"}`}>

                            {
                                items && Array.isArray(items) && items.includes(data?._id) ? "Added" : "Add to Cart"
                            }
                        </button>
                        <Link to={`/classes/${data?._id}`} className="inline-flex justify-center items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <p> Read more</p>
                            <p>

                                <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default ClassCard;
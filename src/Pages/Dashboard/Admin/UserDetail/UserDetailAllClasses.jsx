import React from 'react';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import { Link } from 'react-router-dom';

const UserDetailAllClasses = ({ classes }) => {
    return (
        <>
            <SectionTitle h3={"Classes "} />
            <div className=' flex justify-center items-center flex-wrap gap-5 pb-20'>
                {
                    classes && Array.isArray(classes) &&
                    classes.map((item, _idx) => <Link to={`/dashboard/manage-classes/${item?.class_ID ? item?.class_ID : item?._id} `} key={_idx}>



                        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                         
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item?.className}</h5>
                         
                            <p className="leading-none font-normal text-gray-700 dark:text-gray-400">Price : $ {item?.price ? item?.price : item?.CoursePrice}</p>
                            {item?.availableSeats &&   <p className="leading-none font-normal text-gray-700 dark:text-gray-400">Available Seat: {item?.availableSeats}</p>}
                            {item?.status &&   <p className="leading-none font-normal text-gray-700 dark:text-gray-400">Stauts :  <span className={` ${item?.status === "Denied" ? " text-red-500" : item?.status === "Approved" ? " text-green-500" : " text-yellow-500"}`}>{item?.status}</span></p>}
                          
                          
                          
                            {item?.InstructorName &&   <p className="leading-none font-normal text-gray-700 dark:text-gray-400">Instructor: {item?.InstructorName}</p>}
                            {item?.InstructorEmail &&   <p className="leading-none font-normal text-gray-700 dark:text-gray-400">E-mail: {item?.InstructorEmail}</p>}
                            
                            
                           
                        </div>

                    </Link>
                    )
                }
            </div>
        </>
    );
};

export default UserDetailAllClasses;
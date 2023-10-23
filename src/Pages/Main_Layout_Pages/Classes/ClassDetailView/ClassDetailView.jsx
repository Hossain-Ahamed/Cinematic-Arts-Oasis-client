import React from 'react';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useQuery } from 'react-query';

import Swal from 'sweetalert2';
import LoadingPage from '../../../LoadingPage/LoadingPage/LoadingPage';
import SetTitle from '../../../Shared/SetTtitle/SetTitle';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import useProfile from '../../../../Hooks/useProfile';
import InstructorDetailbar from '../../../Shared/InstructorDetailBar/InstructorDetailBar';
import ScrollToTop from '../../../../components/ScrollToTop/ScrollToTop';
import useCart from '../../../../Hooks/useCart';

const ClassDetailView = () => {

    const { classID } = useParams();


    const axiosSecure = useAxiosSecure();
    const { refetch, data: { InstructorInfo, classInfo } = {}, isLoading, error } = useQuery({
        queryKey: ['classdetails', classID],
        queryFn: async () => {
            const res = await axiosSecure.get(`/get-all-classes/${classID}`);
            // console.log(res.data)
            return res.data;
        }
    })

    const { addtoCart } = useCart();


    if (error) {

        console.error(error)
        Swal.fire(
            `${error?.code}`,
            `${error?.response?.data?.message}`,
            'warning'
        )
        return <>error in classes</>
    }
    if (isLoading) {
        return <LoadingPage />
    }
    return (
        <>
            <ScrollToTop />
            <SetTitle title={`${classInfo?.className} | Cinematic`} />
            <SectionTitle h1={`${classInfo?.className}`} />
            < section className='max-w-7xl mx-auto py-5'>


                {/* isntructor detail  */}
                <InstructorDetailbar InstructorInfo={InstructorInfo} />


                {/* class detail  */}

                <div className='text-start pl-3 pt-10 text-slate-700 dark:text-white  '><h3 className='text-2xl font-medium'>Class Detail</h3></div>
                <hr className="h-px mb-6 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                <div className='grid grid-cols-1 md:grid-cols-5 gap-4 mb-20'>
                    <div className='col-span-1 md:col-span-2 lg:col-span-1 flex justify-center relative'>
                        {/* The button to open modal */}
                        <label htmlFor={classInfo?._id} className='relative' title={classInfo?.videoURL ? "click to see video" : " "}>
                            {
                                classInfo?.videoURL && <span className='absolute top-3 right-4 cursor-pointer' >
                                    <svg className="flex-shrink-0 w-5 h-5 text-white transition duration-75 " viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.53 20.4201H6.21C3.05 20.4201 2 18.3201 2 16.2101V7.79008C2 4.63008 3.05 3.58008 6.21 3.58008H12.53C15.69 3.58008 16.74 4.63008 16.74 7.79008V16.2101C16.74 19.3701 15.68 20.4201 12.53 20.4201Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M19.52 17.0999L16.74 15.1499V8.83989L19.52 6.88989C20.88 5.93989 22 6.51989 22 8.18989V15.8099C22 17.4799 20.88 18.0599 19.52 17.0999Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M11.5 11C12.3284 11 13 10.3284 13 9.5C13 8.67157 12.3284 8 11.5 8C10.6716 8 10 8.67157 10 9.5C10 10.3284 10.6716 11 11.5 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>

                                </span>
                            }


                            <img className="object-cover w-full rounded-lg h-96 md:h-auto md:w-48 md:rounded-lg " src={classInfo?.photoURL} alt={classInfo?.className} />
                            {classInfo?.videoURL && <p className='text-sm cursor-pointer hover:text-gray-900 text-center'>Click to see Video</p>}
                        </label>

                        {/* Put this part before </body> tag */}
                        <input type="checkbox" id={classInfo?._id} className="modal-toggle" />
                        {
                            classInfo?.videoURL && <div className="modal">
                                <div className="modal-box w-fit max-w-5xl">
                                    <iframe className='w-screen max-w-lg h-[300px]' src={classInfo?.videoURL} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                                </div>
                                <label className="modal-backdrop" htmlFor={classInfo?._id}>Close</label>
                            </div>
                        }
                    </div>
                    <div className='col-span-1 md:col-span-3 lg:col-span-4 border-l-0 md:border-l pl-0 md:pl-3 '>
                        <div className='flex justify-between flex-wrap'>
                            <div>
                                <h5 className="mb-0 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{classInfo?.className}</h5>
                                <p className="mb-7 text-sm font-semibold text-gray-500 dark:text-gray-400 leading-none cursor-pointer ">#{classInfo?._id.slice(-6)} </p>

                            </div>
                            <button type="button" onClick={()=>{addtoCart(classInfo?._id)}} className="text-white h-fit bg-[#2557D6] hover:bg-[#2557D6]/90 focus:ring-4 focus:ring-[#2557D6]/50 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 flex justify-around  items-center dark:focus:ring-[#2557D6]/50 mr-2 mb-2">

                                <svg className="mr-1 flex-shrink-0 w-5 h-5 text-white transition duration-75 dark:text-white group-hover:text-white dark:group-hover:text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 2H3.74001C4.82001 2 5.67 2.93 5.58 4L4.75 13.96C4.61 15.59 5.89999 16.99 7.53999 16.99H18.19C19.63 16.99 20.89 15.81 21 14.38L21.54 6.88C21.66 5.22 20.4 3.87 18.73 3.87H5.82001" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M16.25 22C16.9404 22 17.5 21.4404 17.5 20.75C17.5 20.0596 16.9404 19.5 16.25 19.5C15.5596 19.5 15 20.0596 15 20.75C15 21.4404 15.5596 22 16.25 22Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M8.25 22C8.94036 22 9.5 21.4404 9.5 20.75C9.5 20.0596 8.94036 19.5 8.25 19.5C7.55964 19.5 7 20.0596 7 20.75C7 21.4404 7.55964 22 8.25 22Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M9 8H21" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>

                                Add to cart
                            </button>
                        </div>



                        <p className="mb-1 font-medium text-lg text-gray-500 dark:text-gray-400 leading-none">Price : $<span className='font-semibold'>{classInfo?.CoursePrice} </span></p>
                        <p className="mb-1 font-medium text-lg text-gray-500 dark:text-gray-400 leading-none">Available Seats : <span className='font-semibold'>{classInfo?.availableSeats} </span></p>
                        <p className="mb-5 font-medium text-lg text-gray-500 dark:text-gray-400 leading-none">Price : $<span className='font-semibold'>{classInfo?.CoursePrice} </span></p>
                        <p className="text-gray-500 dark:text-gray-400">{classInfo?.description}</p>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ClassDetailView;
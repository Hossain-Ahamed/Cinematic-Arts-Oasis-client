import React from 'react';
import useProfile from '../../../../../Hooks/useProfile';
import useAxiosSecure from '../../../../../Hooks/useAxiosSecure';
import { useQuery } from 'react-query';
import LoadingPage from '../../../../LoadingPage/LoadingPage/LoadingPage';
import ScrollToTop from '../../../../../components/ScrollToTop/ScrollToTop';
import SetTitle from '../../../../Shared/SetTtitle/SetTitle';
import SectionTitle from '../../../../../components/SectionTitle/SectionTitle';
import { Link } from 'react-router-dom';

const StudentAllClass = () => {
    const { profileLoading, profileError } = useProfile();
    const axiosSecure = useAxiosSecure();
    const { data: dataList = [], error, isLoading, refetch } = useQuery({
        queryKey: ['AllClassListOfsParticularStudent'],
        enabled: (!profileLoading && !profileError),
        queryFn: async () => {
            const res = await axiosSecure.get(`/student-panel/my-class-list`);
            // console.log(res.data)
            return res.data;
        },
        cacheTime: 0
    })


    if (profileError || error) {
        console.error(error);
        return <>Error occured in page studentallclass</>
    }
    if (isLoading) {
        return <LoadingPage />
    }

    return (
        <>
            <ScrollToTop />
            <SetTitle title="My Classes | Cinematic" />
            <SectionTitle h1="My Classes" />
            <div className='mt-5 flex justify-center items-center flex-wrap gap-5'>


                {
                    dataList && Array.isArray(dataList) && dataList.map((data, _idx) =>
                        <div key={_idx} className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">



                            {/* The button to open modal */}
                            <label htmlFor={data?._id} className='relative' title={data?.classData && Array.isArray(data?.classData) && data?.classData[0]?.videoURL ? "click to see video" : " "}>
                                {
                                    data?.classData && Array.isArray(data?.classData) && data?.classData[0]?.videoURL && <span className='absolute top-10 right-12 cursor-pointer' >
                                        <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12.53 20.4201H6.21C3.05 20.4201 2 18.3201 2 16.2101V7.79008C2 4.63008 3.05 3.58008 6.21 3.58008H12.53C15.69 3.58008 16.74 4.63008 16.74 7.79008V16.2101C16.74 19.3701 15.68 20.4201 12.53 20.4201Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M19.52 17.0999L16.74 15.1499V8.83989L19.52 6.88989C20.88 5.93989 22 6.51989 22 8.18989V15.8099C22 17.4799 20.88 18.0599 19.52 17.0999Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M11.5 11C12.3284 11 13 10.3284 13 9.5C13 8.67157 12.3284 8 11.5 8C10.6716 8 10 8.67157 10 9.5C10 10.3284 10.6716 11 11.5 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>

                                    </span>
                                }


                                <img className="p-6 rounded-lg w-[380px] h-[242px] object-cover " src={data?.classData && Array.isArray(data?.classData) && data?.classData[0]?.photoURL} alt="product image" />
                            </label>

                            {/* Put this part before </body> tag */}
                            <input type="checkbox" id={data?._id} className="modal-toggle" />
                            {
                                data?.classData && Array.isArray(data?.classData) && data?.classData[0]?.videoURL && <div className="modal">
                                    <div className="modal-box w-fit max-w-5xl">
                                        <iframe className='w-screen max-w-lg h-[300px]' src={data?.classData && Array.isArray(data?.classData) && data?.classData[0]?.videoURL} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                                    </div>
                                    <label className="modal-backdrop" htmlFor={data?._id}>Close</label>
                                </div>
                            }
                            <Link to={data?.classData && Array.isArray(data?.classData) && data?.classData[0]?._id} >
                                <div className="px-5 pb-5">

                                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white" aria-label='course name' title='course name'>{data?.className}</h5>
                                    <div className="flex flex-col justify-center items-start mt-2.5 mb-5">
                                        <span aria-label='isntructor name' title='instructor name' className=' text-sm  '>By <span className='text-gray-600 dark:text-gray-400 hover:cursor-pointer font-semibold'>{data?.InstructorName}</span></span>

                                    </div>
                                    <p className="mb-3 font-medium text-[16px] leading-none text-gray-700 dark:text-gray-200">Joined: <span className='text-sm font-light '>
                                        {
                                            data?.Joindate && new Date(data?.Joindate).toLocaleString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                hour12: true, // Display time in 12-hour format
                                                timeZoneName: 'shortGeneric', // Optional, to display the time zone abbreviation
                                            })

                                        }
                                    </span>
                                    </p>
                                </div>
                            </Link>
                        </div>
                    )
                }

            </div>
        </>
    );
};

export default StudentAllClass;
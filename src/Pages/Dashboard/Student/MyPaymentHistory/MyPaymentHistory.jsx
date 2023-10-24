import React from 'react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import useProfile from '../../../../Hooks/useProfile';
import Swal from 'sweetalert2';
import LoadingPage from '../../../LoadingPage/LoadingPage/LoadingPage';
import SetTitle from '../../../Shared/SetTtitle/SetTitle';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import { useQuery } from 'react-query';

const MyPaymentHistory = () => {
    const axiosSecure = useAxiosSecure();
    const { profileLoading } = useProfile();
    const enabled = !profileLoading;

    const { refetch, data: dataList = [], isLoading, error } = useQuery({
        queryKey: ['paymentHistory'],
        enabled: enabled,
        queryFn: async () => {
            const res = await axiosSecure.get(`/get-my-payment-history`);
            // console.log(res.data)
            return res?.data;
        },
        cacheTime: 0
    });



    if (error) {

        Swal.fire({
            icon: 'error',
            title: `${error?.code} ${error?.response?.status} `,
            text: `${error?.response?.data?.message}`,
            showConfirmButton: false
        })
        return <>Error!!!</>
    }
    if (isLoading) {
        return <LoadingPage />
    }
    return (
        <section className='w-screen md:w-full'>
            <SetTitle title={`Payment History`} />
            <SectionTitle h1={`Payment History`} />

            <div className=' flex justify-center items-center flex-wrap gap-5 pb-20'>
                {
                    dataList && Array.isArray(dataList) &&
                    dataList.map((Student, _idx) =>
                        <div key={_idx} className="  w-fit max-w-[315px] md:max-w-[600px] h-fit text-sm text-gray-500  bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-300 dark:bg-gray-800 dark:border-gray-600">

                            <div className="flex flex-col items-start justify-between mb-2 pt-4 px-3">
                                <h5 className="mb-0 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{Student?.clssName}</h5>
                                <p className="mb-3 text-sm font-semibold text-gray-500 dark:text-gray-400 leading-none cursor-pointer ">#{Student?.class_ID.slice(-6)} </p>
                                <p className="mb-2 font-medium text-[16px] leading-none text-gray-700 dark:text-gray-200 ">Instructor: <span className='text-sm font-light '>{Student?.InstructorName}</span> </p>

                                <p className="mb-1 font-medium text-[19px] leading-none text-gray-900 dark:text-white">Transaction:</p>
                                <p className="mb-0 font-medium text-[14px] leading-none ">Name: <span className='text-sm font-light  dark:text-white '>{Student?.transaction_method_name}</span> </p>
                                <p className="mb-0 font-medium text-[14px] leading-none ">E-mail: <span className='text-sm font-light  dark:text-white '>{Student?.transaction_method_email}</span> </p>
                                <p className="mb-0 font-medium text-[14px] leading-none ">Phone: <span className='text-sm font-light  dark:text-white '>{Student?.transaction_method_phone}</span> </p>
                                <p className="mb-0 font-medium text-[14px] leading-none ">transactionID: <span className='text-sm font-light  dark:text-white '>{Student?.transactionID}</span> </p>
                                <p className="mb-0 font-medium text-[14px] leading-none ">intent_methodID: <span className='text-sm font-light  dark:text-white '>{Student?.intent_methodID}</span> </p>
                                <p className="mb-0 font-medium text-[14px] leading-none ">methodID: <span className='text-sm font-light  dark:text-white '>{Student?.methodID}</span> </p>
                                <p className="mb-2 font-medium text-[14px] leading-none ">Paid: <span className='text-sm font-light  dark:text-white '>${Student?.price}</span> </p>

                                <p className="mb-3 font-medium text-[16px] leading-none text-gray-700 dark:text-gray-200">Joined: <span className='text-sm font-light '>
                                    {
                                        Student?.Joindate && new Date(Student?.Joindate).toLocaleString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            hour12: true, // Display time in 12-hour format
                                            timeZoneName: 'short', // Optional, to display the time zone abbreviation
                                        })

                                    }
                                </span>
                                </p>
                            </div>
                        </div>
                    )
                }
            </div>

        </section>
    );
};

export default MyPaymentHistory;
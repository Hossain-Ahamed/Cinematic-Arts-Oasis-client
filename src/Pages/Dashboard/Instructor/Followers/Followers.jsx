import React from 'react';
import useProfile from '../../../../Hooks/useProfile';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useQuery } from 'react-query';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import SetTitle from '../../../Shared/SetTtitle/SetTitle';
import ScrollToTop from '../../../../components/ScrollToTop/ScrollToTop';

const Followers = () => {
    const { profile } = useProfile();

    const axiosSecure = useAxiosSecure();
    const { refetch, data, isLoading, error } = useQuery({
        queryKey: ['all-my-followers', profile],
        queryFn: async () => {
            const res = await axiosSecure.get(`/get-my-followers/${profile?._id}`);
            // console.log(res.data)
            return res?.data;
        },
        cacheTime: 0
    });

    return (
        <>
        <ScrollToTop/>
        <SectionTitle h1="My Followers"/>
        <SetTitle title="My Followers"/>
            <div className=' flex justify-center items-center flex-wrap gap-5 pb-20'>
                {
                    data && Array.isArray(data) &&
                    data.map((Student, _idx) =>   <div key={_idx} className="  w-[315px] max-w-full h-fit text-sm text-gray-500  bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-300 dark:bg-gray-800 dark:border-gray-600">

                    <div className="flex flex-col items-start justify-between mb-2 pt-4 px-3">
                        <h5 className="mb-0 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{Student?.name}</h5>
                        <p className="mb-3 text-sm font-semibold text-gray-500 dark:text-gray-400 leading-none cursor-pointer ">@{Student?._id.slice(-6)} </p>
                        <p className="mb-0 font-medium text-[16px] leading-none hover:cursor-pointer">E-mail: <span className='text-base font-light hover:underline'> {Student?.email} </span></p>
                        <p className="mb-0 font-medium text-[16px] leading-none hover:cursor-pointer">Phone: <span className='text-base font-light hover:underline'> {Student?.phone} </span></p>
                   
    
    
                    </div>
    
    
                </div>
                    )
                }
            </div>
        </>
    );
};

export default Followers;
import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from 'react-query';
import { LoaderIcon } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import SetTitle from '../../Shared/SetTtitle/SetTitle';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import ClassCard from './ClassCard';

const Classes = () => {

    const axiosSecure = useAxiosSecure();
    const { refetch, data: dataList = [], isLoading, error } = useQuery({
        queryKey: ['classesAll'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/get-all-classes`);
            console.log(res.data)
            return res?.data;
        },
    });

    if (error) {
        return <>error in classes</>
    }
    if (isLoading) {
        return <LoaderIcon />
    }

    return (
        <>
            <SetTitle title="All Classes | Cinematic" />
            <SectionTitle h1="All Classes" />
            <div className='mt-5 flex justify-center items-center flex-wrap gap-5'>


                {
                    dataList.map((data, _idx) => <ClassCard key={_idx} data={data}/>

                    )
                }
               
            </div>
        </>



    );
};

export default Classes;
import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from 'react-query';
import { LoaderIcon } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import SetTitle from '../../Shared/SetTtitle/SetTitle';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import ClassCard from './ClassCard';
import useProfile from '../../../Hooks/useProfile';
import useCart from '../../../Hooks/useCart';
import Swal from 'sweetalert2';
import LoadingPage from '../../LoadingPage/LoadingPage/LoadingPage';
import ScrollToTop from '../../../components/ScrollToTop/ScrollToTop';

const Classes = () => {
    const { role, profile } = useProfile();
    const axiosSecure = useAxiosSecure();
    const { refetch, data: dataList = [], isLoading, error } = useQuery({
        queryKey: ['classesAll'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/get-all-classes`);
            // console.log(res.data)
            return res?.data;
        },
    });


    const { addtoCart} = useCart();


    if (error) {
        return <>error in classes</>
    }
    if (isLoading) {
        return <LoadingPage />
    }

    return (
        <>
            <ScrollToTop />
            <SetTitle title="All Classes | Cinematic" />
            <SectionTitle h1="All Classes" />
            <div className='mt-5 flex justify-center items-center flex-wrap gap-5'>


                {
                    dataList.map((data, _idx) => <ClassCard key={_idx} data={data} role={role} handleAddToCart={addtoCart} />

                    )
                }

            </div>
        </>



    );
};

export default Classes;
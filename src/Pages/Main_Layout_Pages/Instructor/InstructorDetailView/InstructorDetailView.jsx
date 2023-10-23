import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useQuery } from 'react-query';
import Swal from 'sweetalert2';
import LoadingPage from '../../../LoadingPage/LoadingPage/LoadingPage';
import SetTitle from '../../../Shared/SetTtitle/SetTitle';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import InstructorDetailbar from '../../../Shared/InstructorDetailBar/InstructorDetailBar';
import ClassCard from '../../Classes/ClassCard';
import useProfile from '../../../../Hooks/useProfile';
import useCart from '../../../../Hooks/useCart';
import ScrollToTop from '../../../../components/ScrollToTop/ScrollToTop';

const InstructorDetailView = () => {
    const { insID } = useParams();



    const axiosSecure = useAxiosSecure();
    const { refetch, data: { InstructorInfo, classInfo } = {}, isLoading, error } = useQuery({
        queryKey: ['InstructorDetail', insID],
        queryFn: async () => {
            const res = await axiosSecure.get(`/get-all-instructors/${insID}`);
            // console.log(res.data)
            return res.data;
        }
    })


    const { role } = useProfile();
    const { cart, items } = useCart();
    const navigate = useNavigate();


    const handleAddToCart = _id => {
        if (!role) {
            Swal.fire(
                'No Profile',
                'Your must Login .',
                'warning'
            )

            navigate("/login", { replace: true })
        } else {

            if (role !== "Student") {
                Swal.fire(
                    'Unauthorized',
                    'Only student can purchase',
                    'warning'
                )

            } else {
                console.log(_id);
                console.log(cart, items)
            }
        }
    }

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
            <SetTitle title={`${InstructorInfo?.name} | Cinematic`} />
            <SectionTitle h1={`${InstructorInfo?.name}`} />
            < section className='max-w-7xl mx-auto py-5'>


                {/* isntructor detail  */}
                <InstructorDetailbar InstructorInfo={InstructorInfo} />


                {/* class detail  */}
                <div className='text-start pl-3 pt-10 text-slate-700 dark:text-white  '><h3 className='text-2xl font-medium'>{InstructorInfo?.name}&#39;s Classes</h3></div>
                <hr className="h-px mb-6 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                <div className='mt-5 flex justify-center items-center flex-wrap gap-5'>


                    {
                        classInfo && Array.isArray(classInfo) &&
                            classInfo.length > 0 ?
                            classInfo.map((data, _idx) => <ClassCard key={_idx} data={data} role={role} handleAddToCart={handleAddToCart} />)
                            :
                            <p className='text-xl mt-5 font-semibold text-red-500'>No available class of this Instructor</p>
                    }

                </div>
            </section>
        </>
    );
};

export default InstructorDetailView;
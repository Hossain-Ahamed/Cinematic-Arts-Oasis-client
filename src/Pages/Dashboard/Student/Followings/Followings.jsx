import React from 'react';
import useProfile from '../../../../Hooks/useProfile';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useQuery } from 'react-query';
import LoadingPage from '../../../LoadingPage/LoadingPage/LoadingPage';
import ScrollToTop from '../../../../components/ScrollToTop/ScrollToTop';
import SetTitle from '../../../Shared/SetTtitle/SetTitle';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import Instructorcard from '../../../Main_Layout_Pages/Instructor/Instructorcard';
import Swal from 'sweetalert2';
import Error from '../../../Shared/Error/Error';

const Followings = () => {

    const { role, profile, profileRefetch } = useProfile();
    const axiosSecure = useAxiosSecure();
    const { refetch, data: dataList = [], isLoading, error } = useQuery({
        queryKey: ['allinstructor'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/get-all-followed-instructors`);
            // console.log(res.data)
            return res?.data;
        },
    });






    const handleFollow = (insID, type) => {


        if (role !== "Student") {
            Swal.fire(
                'Unauthorized',
                'Only student can follow',
                'warning'
            )

        } else {

            const data = {
                insID: insID,
                type: type,
                _id: profile?._id
            }

            axiosSecure.patch('/followings', data)
                .then(data => {
                    profileRefetch();
                    refetch();
                    // toast.success()
                })
                .catch(e => console.error(e))


        }

    }

    if (error) {
        return <Error error={error} />
    }
    // if (isLoading) {
    //     return <LoadingPage />
    // }

    return (
        <>
            <ScrollToTop />
            <SetTitle title="Followed Instructor" />
            <SectionTitle h1="Followed Instructors" />
            <div className='mt-5 flex justify-center items-center flex-wrap gap-5'>


                {
                    dataList && Array.isArray(dataList) && dataList.map((data, _idx) => <Instructorcard key={_idx} data={data} role={role} handleFollow={handleFollow} profile={profile} />

                    )
                }

            </div>
        </>



    );
};

export default Followings;
import React from 'react';
import useProfile from '../../../Hooks/useProfile';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import toast, { LoaderIcon } from 'react-hot-toast';
import SetTitle from '../../Shared/SetTtitle/SetTitle';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import Instructorcard from './Instructorcard';

const Instructors = () => {
    const { role, profile,profileRefetch } = useProfile();
    const axiosSecure = useAxiosSecure();
    const { refetch, data: dataList = [], isLoading, error } = useQuery({
        queryKey: ['allinstructor'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/get-all-instructors`);
            // console.log(res.data)
            return res?.data;
        },
    });


    const navigate = useNavigate();
    


    const handleFollow = (insID,type) => {
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
                    'Only student can follow',
                    'warning'
                )

            } else {

                const data = {
                    insID : insID,
                    type : type,
                    _id : profile?._id
                }

              axiosSecure.patch('/followings',data)
              .then(data=>{
                profileRefetch();
                // toast.success()
              })
              .catch(e=>console.error(e))
                
               
            }
        }
    }

    if (error) {
        return <>error in classes</>
    }
    if (isLoading) {
        return <LoaderIcon />
    }

    return (
        <>
            <SetTitle title="All Instructor | Cinematic" />
            <SectionTitle h1="All Instructor" />
            <div className='mt-5 flex justify-center items-center flex-wrap gap-5'>


                {
                    dataList.map((data, _idx) => <Instructorcard key={_idx} data={data} role={role} handleFollow={handleFollow} profile={profile}/>

                    )
                }

            </div>
        </>



    );
};

export default Instructors;
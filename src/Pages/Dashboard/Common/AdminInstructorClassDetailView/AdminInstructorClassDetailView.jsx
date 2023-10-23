import React from 'react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import useProfile from '../../../../Hooks/useProfile';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import LoadingPage from '../../../LoadingPage/LoadingPage/LoadingPage';
import Swal from 'sweetalert2';

const AdminInstructorClassDetailView = () => {
    const axiosSecure = useAxiosSecure();
    const { classID } = useParams();
    const { profileLoading } = useProfile();
    const enabled = !profileLoading;

    const { refetch, data: classData = {}, isLoading, error } = useQuery({
        queryKey: ['allclasseslist', classID],
        enabled: enabled,
        queryFn: async () => {
            const res = await axiosSecure.get(`/manage-classes/class-list/${classID}`);
            console.log(res.data)
            return res?.data;
        },
    });



    if (error) {
    
        Swal.fire({
            icon: 'error',
            title: `${error?.code} ${error?.response?.status} `,
            text: `${error?.response?.data?.message}`,
            showConfirmButton: false
        })
        return <>error in classes</>
    }
    if (isLoading) {
        return <LoadingPage />
    }
    return (
        <div>

        </div>
    );
};

export default AdminInstructorClassDetailView;
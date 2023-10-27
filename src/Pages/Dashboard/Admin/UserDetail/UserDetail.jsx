import React from 'react';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useQuery } from 'react-query';
import Swal from 'sweetalert2';
import Error from '../../../Shared/Error/Error';

const UserDetail = () => {
    const { userID } = useParams();

    const axiosSecure = useAxiosSecure();
    const { refetch, data, isLoading, error } = useQuery({
        queryKey: ['userDetail', userID],
        queryFn: async () => {
            const res = await axiosSecure.get(`all-users/${userID}`);
            console.log(res.data)
            return res?.data;
        },
    });



    if (error) {
      
     

        return <Error error={error} />

    }
    return (
      <>hi</>
    );
};

export default UserDetail;
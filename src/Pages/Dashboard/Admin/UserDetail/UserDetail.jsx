import React from 'react';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useQuery } from 'react-query';
import Swal from 'sweetalert2';
import Error from '../../../Shared/Error/Error';
import Instructorcard from '../../../Main_Layout_Pages/Instructor/Instructorcard';
import UserDetailFollowings from './UserDetailFollowings';
import UserDetailFollowers from './UserDetailFollowers';
import LoadingPage from '../../../LoadingPage/LoadingPage/LoadingPage';
import UserDetailAllClasses from './UserDetailAllClasses';
import UserDetail_Profile from './UserDetail_Profile';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import SetTitle from '../../../Shared/SetTtitle/SetTitle';

const UserDetail = () => {
    const { userID } = useParams();

    const axiosSecure = useAxiosSecure();
    const { refetch, data, isLoading, error } = useQuery({
        queryKey: ['userDetail', userID],
        queryFn: async () => {
            const res = await axiosSecure.get(`all-users/${userID}`);
            // console.log(res.data)
            return res?.data;
        },
        cacheTime: 0
    });



    if (error) {
        return <Error error={error} />
    }

    if (isLoading) {
        return <LoadingPage />
    }
    return (
        <>
        <SectionTitle h1="User Profile"/>
        <SetTitle title="User Profile"/>

            {
                data?.userData && <UserDetail_Profile profile={data?.userData} />
            }

            {
                data?.othersData?.takenClasses && <UserDetailAllClasses classes={data?.othersData?.takenClasses} />
            }

            {/* following */}
            {
                data?.othersData?.followings && <UserDetailFollowings followings={data?.othersData?.followings} />
            }

            {/* follower */}
            {
                data?.othersData?.followers && <UserDetailFollowers followers={data?.othersData?.followers} />
            }


        </>
    );
};

export default UserDetail;
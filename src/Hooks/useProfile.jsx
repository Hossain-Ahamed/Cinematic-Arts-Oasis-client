import React from 'react';
import useAuthProvider from './useAuthProvider';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from 'react-query';

const useProfile = () => {

    const { user, loading } = useAuthProvider();
    const axiosSecure = useAxiosSecure();
    const { refetch :profileRefetch, data: profile = {}, isLoading: profileLoading, error } = useQuery({
        queryKey: ['profile', user?.email],
        enabled: (!loading && (!!user)),
        queryFn: async () => {
            const res = await axiosSecure.get(`/get-profile/${user?.email}`);
            console.log("profile: ",res.data, '\n role : ',{ role : res.data?.role})
            return res?.data;
        },
    });
    return { profile, profileLoading, profileRefetch, role: profile?.role, profileError: error }
};

export default useProfile;
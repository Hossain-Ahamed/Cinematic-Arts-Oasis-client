import React from 'react';
import useProfile from './useProfile';
import { useQuery } from 'react-query';
import useAxiosSecure from './useAxiosSecure';

const useCart = () => {
    const { profileLoading, role, profile } = useProfile();

    const axiosSecure = useAxiosSecure();



    const enabled = role === "Student" && !profileLoading



    const { refetch :cartRefetch, data: cart = {}, isLoading: cartLoading, error :cartError } = useQuery({
        queryKey: ['cart', profile?.email],
        enabled: enabled,
        queryFn: async () => {
            const res = await axiosSecure.get(`/get-cart/${profile?.email}`);
            // console.log("profile: ",res.data, '\n role : ',{ role : res.data?.role})
            return res?.data;
        },
    });
    return { cart, items : cart?.items, cartRefetch, cartError }
   
};

export default useCart;
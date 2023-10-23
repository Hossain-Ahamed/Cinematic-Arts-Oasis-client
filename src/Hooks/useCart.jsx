import React from 'react';
import useProfile from './useProfile';
import { useQuery } from 'react-query';
import useAxiosSecure from './useAxiosSecure';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const useCart = () => {


    const { profileLoading, role, profile } = useProfile();
    const navigate = useNavigate();
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



    const deleteCartItem = _id =>{
        console.log("delete cart Item",_id)
    }
    const addtoCart = _id =>{

        
   
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
               
            }
        }
    

        console.log("add cart Item",_id)
    }
    return { cart, items : cart?.items, cartRefetch, cartError, addtoCart,deleteCartItem }
   
};

export default useCart;
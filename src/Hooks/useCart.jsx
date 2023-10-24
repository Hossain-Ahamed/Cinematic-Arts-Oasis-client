import React from 'react';
import useProfile from './useProfile';
import { useQuery } from 'react-query';
import useAxiosSecure from './useAxiosSecure';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

const useCart = () => {


    const { profileLoading, role, profile } = useProfile();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const enabled = role === "Student" && !profileLoading



    const { refetch: cartRefetch, data: cart = {}, isLoading: cartLoading, error: cartError } = useQuery({
        queryKey: ['cart', profile?.email],
        enabled: enabled,
        queryFn: async () => {
            const res = await axiosSecure.get(`/get-cart/${profile?.email}`);
            // console.log("cart: ", res.data?.items)
            return res?.data;
        },
    });



    const deleteCartItem = _id => {

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
                // console.log(_id);
                const data = {
                    classID: _id
                }
                axiosSecure.patch(`/get-cart/delete/${profile?.email}`, data)
                    .then(data => {
                        toast.success(data.data?.message || "Removed")
                        cartRefetch();
                    }).catch(e => console.error(e))

            }
        }


        console.log("add cart Item", _id)
    }


    const addtoCart = _id => {



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

                if (cart?.items && Array.isArray(cart?.items)) {
                    if (cart?.items.includes(_id)) {
                        toast.error("already added to cart")
                    } else {
                        // console.log(_id);
                        const data = {
                            classID: _id
                        }
                        axiosSecure.patch(`/get-cart/add/${profile?.email}`, data)
                            .then(data => {
                               toast.success(data.data?.message || "added")
                                cartRefetch();
                            }).catch(error => {
                                console.error(error);
                                Swal.fire({
                                    icon: 'error',
                                    title: `${error?.code} ${error?.response?.status} `,
                                    text: `${error?.response?.data?.message}`,
                                    showConfirmButton: false
                                })
                            })
                    }
                }

            }
        }
    }


    return { cart, items: cart?.items, cartLoading, cartRefetch, cartError, addtoCart, deleteCartItem }

};

export default useCart;
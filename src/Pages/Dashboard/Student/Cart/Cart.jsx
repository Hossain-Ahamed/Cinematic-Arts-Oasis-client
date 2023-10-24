import React from 'react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import useProfile from '../../../../Hooks/useProfile';
import { useQuery } from 'react-query';
import Swal from 'sweetalert2';
import LoadingPage from '../../../LoadingPage/LoadingPage/LoadingPage';
import useCart from '../../../../Hooks/useCart';
import SetTitle from '../../../Shared/SetTtitle/SetTitle';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const { profileLoading, profile } = useProfile();
    const enabled = !profileLoading;
    const { deleteCartItem, cart } = useCart()

    const { refetch, data: { _id, items, email } = {}, isLoading, error } = useQuery({
        queryKey: ['detailcart', cart],
        enabled: enabled,
        queryFn: async () => {
            const res = await axiosSecure.get(`/get-detail-cart/${profile?.email}`);
            // console.log(res.data)
            return res?.data;
        },
    });



    if (error) {
        console.error(error)

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
        <section className='w-screen md:w-full min-h-screen'>
            <SetTitle title="carts" />
            <SectionTitle h1="My Carts" />
            <div className="overflow-x-auto mt-5">
                <table className="min-w-full text-sm text-left">
                    <thead className="text-xs uppercase ">
                        <tr>

                            <th scope="col" className="px-6 py-3">
                                Class Info
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Instructor Info
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Available Seat
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" className="px-2 py-3">
                                Pay
                            </th>
                            <th scope="col" className="px-2 py-3">
                                Delete
                            </th>

                        </tr>
                    </thead>

                    <tbody>
                        {
                            items && Array.isArray(items) &&
                            items.map((data, _idx) => <tr key={_idx} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                                <td scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white hover:cursor-pointer">
                                    <img className="w-10 h-10 rounded-full" src={data?.photoURL} alt={data?.name} />
                                    <div className="pl-3">
                                        <div className="text-base font-semibold">{data?.className}</div>
                                        <div className="font-normal text-xs text-gray-500">#{data?._id.slice(-6)}</div>
                                    </div>
                                </td>


                                <td className="px-6 py-4">
                                    <div className="text-base font-semibold">{data?.name}</div>
                                    <div className="font-normal text-xs text-gray-500">{data?.email}</div>
                                </td>

                                <td className="px-6 py-4">
                                    {data?.availableSeats}
                                </td>
                                <td className="px-6 py-4">
                                    {data?.CoursePrice}
                                </td>
                                <td className="px-2 py-4">
                                    {
                                        data?.availableSeats > 0 ?
                                            <button type="button" onClick={() => navigate(`/dashboard/payment/${data?._id}`)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Proceed To Pay</button>
                                            :
                                            <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3.5 py-2.5 mr-2  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Seat not available</button>

                                    }

                                </td>
                                <td className="px-2 py-4 " onClick={() => { deleteCartItem(data?._id); refetch(); }}>


                                    <svg className="cursor-pointer flex-shrink-0 w-5 h-5 text-red-500 transition duration-75 dark:text-gray-300 group-hover:text-red-900" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21 5.97998C17.67 5.64998 14.32 5.47998 10.98 5.47998C9 5.47998 7.02 5.57998 5.04 5.77998L3 5.97998" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M18.8499 9.13989L18.1999 19.2099C18.0899 20.7799 17.9999 21.9999 15.2099 21.9999H8.7899C5.9999 21.9999 5.9099 20.7799 5.7999 19.2099L5.1499 9.13989" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M10.3301 16.5H13.6601" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M9.5 12.5H14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>


                                </td>


                            </tr>
                            )
                        }


                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default Cart;
import React, { useState } from 'react';
import useProfile from '../../../../Hooks/useProfile';
import { Link, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useQuery } from 'react-query';
import LoadingPage from '../../../LoadingPage/LoadingPage/LoadingPage';
import ScrollToTop from '../../../../components/ScrollToTop/ScrollToTop';
import SetTitle from '../../../Shared/SetTtitle/SetTitle';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

const ManageClass = () => {

    const [type, setType] = useState("All");
    const types = ["All", "Pending", "Denied", "Approved"];


    const handleTypeChange = (e) => {
        if (types.includes(e.target.value)) {
            setType(e.target.value);

        } else {
            setType("All");
        }
    }

    const { profileLoading, role, profile } = useProfile();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const enabled = !profileLoading

    const { refetch, data: dataList = [], isLoading, error } = useQuery({
        queryKey: ['allclasseslist', profile?.email, type],
        enabled: enabled,
        queryFn: async () => {
            const res = await axiosSecure.get(`/manage-classes/class-list?role=${role}&type=${type}&email=${profile?.email}`);
            // console.log(res.data)
            return res?.data;
        },
    });


    const changeStatus = (status, classID) => {
        if (role !== "Admin") {
            Swal.fire({
                icon: 'error',
                title: 'ERROR OCCURRED',
                text: 'You cant change',
            })
        }
        if (!["Pending", "Denied", "Approved"].includes(status)) {
            status = "Pending"
        }
        const data = {
            status: status
        }
        axiosSecure.patch(`/manage-classes/class-list/change-status/${classID}`, data)
            .then(data => {
                // console.log(data.data?.message)
                refetch();
                toast.success(data?.data?.message || "Successful");
            })
            .catch(e => console.error(e));
    }


    if (error) {
        console.error(error)
        return <>error in classes</>
    }
    if (isLoading) {
        return <LoadingPage />
    }

    return (
        <section className='w-screen md:w-full min-h-screen'>
            <ScrollToTop />
            <SetTitle title="All classes" />

            <div className='px-4 flex justify-between flex-wrap items-center mb-2 border-b '>

                <p aria-label='title' className='text-3xl font-extrabold text-gray-700 dark:text-gray-300'>All Classes</p>

            </div>
            <div className='flex justify-between flex-wrap mt-4 mb-1 user-select-none'>

                <div className='flex items-center gap-3 mb-5 md:mb-1' aria-label='dropdown'>


                    {/* number of size in table  */}
                    <div aria-label='number of size in tabel dropdwnn'>
                        <select
                            name="type"
                            value={type.toString()}
                            onChange={handleTypeChange}
                            id="type" className=" border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2 cursor-pointer bg-white dark:bg-slate-600 dark:border dark:text-white">
                            <option value="All">All</option>
                            <option value="Pending">Pending</option>
                            <option value="Denied">Denied</option>
                            <option value="Approved">Approved</option>

                        </select>

                    </div>



                </div>




            </div >
            <div className="overflow-x-auto mt-5">
                <table className="min-w-full text-sm text-left">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>

                        </tr>
                    </thead>

                    <tbody>
                        {
                            dataList && Array.isArray(dataList) &&
                            dataList.map((data) => <tr key={data?._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                                <th onClick={() => navigate(`${data?._id}`)} scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white hover:cursor-pointer">
                                    <img className="w-10 h-10 rounded-full" src={data?.photoURL} alt={data?.name} />
                                    <div className="pl-3">
                                        <div className="text-base font-semibold">{data?.className}</div>
                                        <div className="font-normal text-xs text-gray-500">#{data?._id.slice(-6)}</div>
                                    </div>
                                </th>


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
                                <td className="px-6 py-4">
                                    {
                                        role === "Admin" && data?.status !==  "Approved" ? 
                                            <div>

                                                <select
                                                    defaultValue={data?.status}

                                                    onChange={(e) => changeStatus(e.target.value, data?._id)}

                                                    className="block w-full py-2 px-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                >

                                                    <option disabled>Select an option</option>
                                                    <option value="Approved">Approved</option>
                                                    <option value="Pending">Pending</option>
                                                    <option value="Denied">Denied</option>

                                                </select>

                                            </div>
                                            :

                                            <div className="flex items-center">
                                                <div className={`h-2.5 w-2.5 rounded-full ${data?.status === "Denied" ? "bg-red-500 text-red-500" : data?.status === "Approved" ? "bg-green-500 text-green-500" : "bg-yellow-500 text-yellow-500"} mr-2`}></div>
                                                <span className={` ${data?.status === "Denied" ? " text-red-500" : data?.status === "Approved" ? " text-green-500" : " text-yellow-500"}`}>{data?.status}</span>
                                            </div>
                                    }
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

export default ManageClass;
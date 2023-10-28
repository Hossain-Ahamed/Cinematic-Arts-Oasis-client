import React, { useState } from 'react';
import { ErrorIcon, LoaderIcon } from 'react-hot-toast';
import RangeBar from '../../../Shared/Rangebar/RangeBar';
import Paginator from '../../../Shared/Paginator/Pagiantor';
import { Link, useNavigate } from 'react-router-dom';
import useGetAllusers from '../../../../Hooks/useGetAllusers';
import ScrollToTop from '../../../../components/ScrollToTop/ScrollToTop';
import SetTitle from '../../../Shared/SetTtitle/SetTitle';
import LoadingPage from '../../../LoadingPage/LoadingPage/LoadingPage';

const AllUsers = () => {
    const navigate = useNavigate();

    const [searchValue, setPageSearchValue] = useState('')


    const [currentPage, setCurrentPage] = useState(1);


    const [numberOfSizeInTableData, setnumberOfSizeInTableData] = useState(15);  // page number size  15 30 50 100 500



    const { dataList, queryError, queryLoading, alluserRefetch, totalPage } = useGetAllusers({ currentPage, searchValue, numberOfSizeInTableData })

    if (queryError) {
        console.error(queryError)
        return <ErrorIcon />
    }
    if(queryLoading){
        return <LoadingPage/>
    }

    return (

        <section className='w-screen md:w-full min-h-screen'>
            <SetTitle title={"All users"}/>
            
            <RangeBar

                numberOfSizeInTableData={numberOfSizeInTableData}
                pageTitle={"All users"}
                placeholder={"Name Phone Email UID"}
                searchValue={searchValue}
                setCurrentPage={setCurrentPage}

                setNumberOfSizeInTable={setnumberOfSizeInTableData}
                setPageSearchValue={setPageSearchValue}


            />

            <div className="relative  shadow-md sm:rounded-lg ">
                {
                    queryLoading && <div className='w-full h-screen flex justify-center items-center text-4xl'>
                        <LoaderIcon style={{ height: '48px', width: '48px', fontWeight: 'bold' }} />
                    </div>
                }
                <div className="overflow-x-auto mt-5">
                    <table className="min-w-full text-sm text-left">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>

                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Phone
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    firebase_UID
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Role
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Gender
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Institute
                                </th>

                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                dataList && Array.isArray(dataList) &&
                                dataList.map((user) => <tr key={user?.firebase_UID} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                                    <th onClick={()=>navigate(user?._id)} scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white cursor-pointer">
                                        <img className="w-10 h-10 rounded-full" src={user?.photoURL} alt={user?.name} />
                                        <div className="pl-3">
                                            <div className="text-base font-semibold">{user?.name}</div>
                                            <div className="font-normal text-gray-500">{user?.email}</div>
                                        </div>
                                    </th>
                                    <td className="px-6 py-4">
                                        {user?.phone}
                                    </td>
                                    <td className="px-6 py-4">
                                        {user?.firebase_UID}
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className={`h-2.5 w-2.5 rounded-full ${user?.role === "Admin" ? "bg-red-500" : user?.role === "Instructor" ? "bg-green-500" : "bg-yellow-500"} mr-2`}></div> {user?.role}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {user?.gender}
                                    </td>
                                    <td className="px-6 py-4">
                                        {user?.institute}
                                    </td>
                                    <td className="px-6 py-4">
                                        <Link to={`/dashboard/all-users/update-user-profile?email=${user?.email}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Update</Link>
                                    </td>
                                </tr>
                                )
                            }


                        </tbody>
                    </table>
                </div>
            </div>


            <Paginator currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPage} refetch={alluserRefetch} />

            <ScrollToTop />
        </section>

    );
};

export default AllUsers;
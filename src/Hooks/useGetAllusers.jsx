import React from 'react';
import { useQuery } from 'react-query';
import useAxiosSecure from './useAxiosSecure';

const useGetAllusers = ({ currentPage, searchValue, numberOfSizeInTableData }) => {
    const axiosSecure = useAxiosSecure();
    const { refetch:alluserRefetch, data: queryData = {}, isLoading: queryLoading, error: queryError } = useQuery({
        queryKey: ['userList', currentPage, searchValue, numberOfSizeInTableData],
        queryFn: async () => {
            const res = await axiosSecure.get(`/all-users?search=${searchValue}&currentPage=${currentPage - 1}&numberOfSizeInTableData=${numberOfSizeInTableData}`);
            // console.log(res.data)
            return res?.data;
        },
    });

    return {dataList : queryData?.dataList,totalPage :Math.ceil(queryData?.totalCount / numberOfSizeInTableData) ,queryLoading,queryError, alluserRefetch }
   
};

export default useGetAllusers;
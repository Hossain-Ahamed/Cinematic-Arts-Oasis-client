import React from 'react';

const StudentCard_AdminInstructorClassDetailView = ({ Student, role,handleKickOut }) => {



    return (
        <>
            <div className="  w-fit max-w-[315px] md:max-w-[600px] h-fit text-sm text-gray-500  bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-300 dark:bg-gray-800 dark:border-gray-600">

                <div className="flex flex-col items-start justify-between mb-2 pt-4 px-3">
                    <h5 className="mb-0 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{Student?.stdName}</h5>
                    <p className="mb-3 text-sm font-semibold text-gray-500 dark:text-gray-400 leading-none cursor-pointer ">@{Student?.std_ID.slice(-6)} </p>
                    <p className="mb-0 font-medium text-[16px] leading-none hover:cursor-pointer">E-mail: <span className='text-base font-light hover:underline'> {Student?.stdEmail} </span></p>
                    <p className="mb-3 font-medium text-[16px] leading-none ">Joined: <span className='text-sm font-light '>
                        {
                            Student?.Joindate && new Date(Student?.Joindate).toLocaleString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true, // Display time in 12-hour format
                                timeZoneName: 'short', // Optional, to display the time zone abbreviation
                            })

                        }
                    </span>
                    </p>

                    {
                        role === "Admin" &&
                        <>
                            <p className="mb-1 font-medium text-[18px] leading-none ">Transaction:</p>

                            <p className="mb-0 font-medium text-[16px] leading-none ">Name: <span className='text-sm font-light '>{Student?.transaction_method_name}</span> </p>
                            <p className="mb-0 font-medium text-[16px] leading-none ">E-mail: <span className='text-sm font-light '>{Student?.transaction_method_email}</span> </p>
                            <p className="mb-0 font-medium text-[16px] leading-none ">Phone: <span className='text-sm font-light '>{Student?.transaction_method_phone}</span> </p>
                            <p className="mb-0 font-medium text-[16px] leading-none ">transactionID: <span className='text-sm font-light '>{Student?.transactionID}</span> </p>
                            <p className="mb-0 font-medium text-[16px] leading-none ">intent_methodID: <span className='text-sm font-light '>{Student?.intent_methodID}</span> </p>
                            <p className="mb-0 font-medium text-[16px] leading-none ">methodID: <span className='text-sm font-light '>{Student?.methodID}</span> </p>
                            <p className="mb-2 font-medium text-[16px] leading-none ">Paid: <span className='text-sm font-light '>${Student?.price}</span> </p>
                            <button onClick={()=>{handleKickOut(Student?._id)}} className={`text-white rounded text-sm px-5 py-1.5 text-center font-medium  bg-red-500 `}>
                                Kick Out
                            </button>
                        </>
                    }


                </div>


            </div>
        </>
    );
};

export default StudentCard_AdminInstructorClassDetailView;
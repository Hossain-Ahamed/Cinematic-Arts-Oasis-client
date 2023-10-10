import React, { useEffect, useState } from 'react';
import SetTitle from '../../../Shared/SetTtitle/SetTitle';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import useProfile from '../../../../Hooks/useProfile';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const UpdateProfile = () => {
    const { profile, role } = useProfile();
    const axiosSecure = useAxiosSecure();
    const { Gender, setGender } = useState(profile?.gender);


    const { register, formState: { errors }, handleSubmit, setValue } = useForm({ mode: "onSubmit" });

    const submission = (data) => {
        
        const Uploaddata = {
            name : data?.FirstName+data?.LastName,
            phone : data?.phone,
            institute: data?.institute,
            gender : data?.gender,
            address : data?.address
        }
        
        console.log(Uploaddata)
        // axiosSecure.patch(`/admin/admin-list`, data)
        //     .then(result => {
        //         console.log(result.data)
        //         setRole(data?.role);
        //         Swal.fire(
        //             'Successful!',
        //             `${user?.name}'s Role set to ${data?.role}!`,
        //             'success'
        //         )
        //     }).catch(e => {
        //         // console.log(e);

        //         Swal.fire({
        //             icon: 'error',
        //             title: 'ERROR OCCURRED',
        //             text: 'Error: role set unsuccessful',
        //         })
        //     })


    };
    // const handleGenderSelect = 
    return (
        <>
            <SetTitle title="Update profile" />
            <SectionTitle h1="Update Your Profile" />
            <form className='max-w-5xl mx-auto' onSubmit={handleSubmit(submission)}>
                {/* image  */}

                <div className="flex items-center justify-center max-w-[300px] mx-auto">
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">Profile Photo</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        </div>
                        <input id="dropzone-file" type="file" className="hidden" />
                    </label>
                </div>
                <div className="grid gap-6 mb-6 md:grid-cols-2">



                    {/* name  */}
                    <div>
                        <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
                        <input type="text"   {...register("FirstName", {
                            required: "*First Name required",
                        })}
                            defaultValue={profile?.name ? profile?.name.split(" ")[0] : ""}
                            id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" />
                        {errors.FirstName && (
                            <p className="p-1 text-xs text-red-600">{errors.FirstName.message}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name</label>
                        <input type="text"  {...register("LastName", {
                            required: "*Last Name required",
                        })}
                            defaultValue={profile?.name ? profile?.name.split(" ").slice(1) : ""} id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" />
                        {errors.LastName && (
                            <p className="p-1 text-xs text-red-600">{errors.LastName.message}</p>
                        )}
                    </div>


                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                        <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:cursor-not-allowed" placeholder="john.doe@company.com" value={profile?.email} disabled />
                    </div>

                    {/* phone  */}
                    <div>
                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
                        <input type="tel"  {...register("phone", {
                            required: "*phone required",
                        })}
                            defaultValue={profile?.phone} id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123-45-678" />
                        {errors.phone && (
                            <p className="p-1 text-xs text-red-600">{errors.phone.message}</p>
                        )}
                    </div>

                    {/* institute name  */}
                    <div>
                        <label htmlFor="Institute-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Institute name </label>
                        <input type="text"  {...register("institute", {
                            required: "*Institute name required",
                        })}
                            defaultValue={profile?.institute}
                            id="Institute-name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Alexa School of Engineering" />
                        {errors.institute && (
                            <p className="p-1 text-xs text-red-600">{errors.institute.message}</p>
                        )}
                    </div>

                    {/* gender  */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender </label>
                        <select
                            value={Gender}
                            {...register("gender", {
                                required: "*Gender required",
                            })}

                            className="block w-full py-2 px-1 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none  "
                        >

                            <option disabled>Select an option</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Others">Others</option>

                        </select>
                        {errors.Gender && (
                            <p className="p-1 text-xs text-red-600">{errors.Gender.message}</p>
                        )}
                    </div>
                </div>
                <div className="mb-6">
                    <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                    <textarea  {...register("address", {
                        required: "*Address required",
                    })}
                        id="address" className="resize-none h-16 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Silicon Valley, USA" />
                    {errors.Address && (
                        <p className="p-1 text-xs text-red-600">{errors.Address.message}</p>
                    )}
                </div>

                <div className="flex items-start mb-6">
                    <div className="flex items-center h-5">
                        <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"  required/>
                    </div>
                    <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a>.</label>
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>

        </>
    );
};

export default UpdateProfile;
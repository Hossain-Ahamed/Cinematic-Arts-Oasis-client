import React, { useState } from 'react';
import LoadingPage from '../../../LoadingPage/LoadingPage/LoadingPage';
import SetTitle from '../../../Shared/SetTtitle/SetTitle';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom';
import useProfile from '../../../../Hooks/useProfile';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import axios from 'axios';
import { validateURL } from '../../../../assets/utilityScript';
import toast from 'react-hot-toast';

const AddClass = () => {
    const { profile, profileLoading, profileError } = useProfile();
    const navigate = useNavigate();

    const axiosSecure = useAxiosSecure();

    const [selectedImage, setSelectedImage] = useState(null);

    // upload prgress 
    const [loadOnSave, setLoadOnSave] = useState(false);

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setSelectedImage(URL.createObjectURL(e.target.files[0])); // Set selectedImage state with the URL
        }
    };


    const { register, formState: { errors }, handleSubmit, setValue } = useForm({ mode: "onSubmit" });

    const submission = async data => {
       
        //  setLoadOnSave(true)

        const Uploaddata = {
            email : profile?.email,
            name: profile?.name,
            UID : profile?.firebase_UID,
            className : data?.className,
            videoURL : data?.videoURL,
            availableSeats: parseInt(data?.availableSeats),
            CoursePrice : parseFloat(parseFloat(data?.CoursePrice).toFixed(2)),
            description : data?.description
        }

        // console.log(Uploaddata)

        if (data?.img.length !== 0) {
            const formData = new FormData();
            formData.append("image", data.img[0]);
            await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_ImgBBAPI}`, formData)
                .then(res => {
                    if (res.data.success) {
                        const imgURL = res.data?.data?.display_url;
                        Uploaddata.photoURL = imgURL
                    }
                }).catch(e => { console.error(e) })
                .finally(() => {
                    uploadToServer(Uploaddata)

                })
        } else {
            toast.error("Image is Required")
        }
        setLoadOnSave(false);
    };

    const uploadToServer = data => {

        axiosSecure.post(`/instructor/add-class`, data)
            .then(result => {

                Swal.fire(
                    'Successful!',
                    `Class Created`,
                    'success'
                )
                navigate('/')

            }).catch(e => {
                // console.log(e);

                Swal.fire({
                    icon: 'error',
                    title: 'ERROR OCCURRED',
                    text: e?.response?.data?.message,
                })
            })
    }
    if (profileLoading) {
        return <LoadingPage />
    }
    if (profileError) {

        // todo : new error page 
        return <>error</>
    }
    return (
        <>
            {
                loadOnSave && <LoadingPage />
            }
            <SetTitle title="Add Class | Cinematic" />
            <SectionTitle h1="Add a Class" />
            <form className='max-w-5xl mx-auto min-h-screen select-none' onSubmit={handleSubmit(submission)}>
                {/* image  */}

                <div className="flex items-center justify-center max-w-[300px] mx-auto relative">
                    <label className="flex flex-col items-center justify-center w-44 h-44 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        {
                            selectedImage ?
                                <>
                                    <img src={selectedImage} alt="" className='w-full h-full rounded' />
                                </>
                                :
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">Class Cover Photo</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span></p>
                                </div>
                        }
                        <input type="file"  {...register("img")}
                            className=" w-full h-full absolute top-0 left-0 cursor-pointer opacity-0"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </label>
                </div>

                <div className="grid gap-6 mb-6 md:grid-cols-2 mt-3">
                    {/*  class name  */}
                    <div className='mb-2'>
                        <label htmlFor="classsName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Class Name</label>
                        <input type="text"   {...register("className", {
                            required: "*Class Name required",
                        })}

                            id="classsName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Fine n Arts" />
                        {errors.className && (
                            <p className="p-1 text-xs text-red-600">{errors.className.message}</p>
                        )}
                    </div>

                    {/* url video   */}
                    <div>
                        <label htmlFor="videoURL" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Video Link</label>
                        <input type="text"  {...register("videoURL", {
                            validate: (value) => validateURL(value) || "Not a url"
                        })}

                            id="videoURL" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="https://www.abx.com" />
                        {errors.videoURL && (
                            <p className="p-1 text-xs text-red-600">{errors.videoURL.message}</p>
                        )}
                    </div>


                    {/* Available seats  */}
                    <div>
                        <label htmlFor="availableSeats" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Availabale Seat</label>
                        <input type="text"  {...register("availableSeats", {
                            required: "*available Seats required",
                            validate: (value) => !isNaN(Number(value)) || "Please enter a number",
                        })}
                            id="availableSeats"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="125" />
                        {errors.availableSeats && (
                            <p className="p-1 text-xs text-red-600">{errors.availableSeats.message}</p>
                        )}
                    </div>

                    {/* Price   */}
                    <div>
                        <label htmlFor="Institute-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Course price </label>
                        <input type="text"  {...register("CoursePrice", {
                            required: "*Course Price  required",
                            validate: (value) => !isNaN(Number(value)) || "Please enter a number",
                        })}
                           
                            id="CoursePrice" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="500" />
                        {errors.CoursePrice && (
                            <p className="p-1 text-xs text-red-600">{errors.CoursePrice.message}</p>
                        )}
                    </div>




                    {/* Instructor name */}
                    <div>
                        <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Instructor name</label>
                        <input type="text"
                            defaultValue={profile?.name} id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 read-only:cursor-not-allowed " placeholder="Doe" readOnly />
                        {errors.LastName && (
                            <p className="p-1 text-xs text-red-600">{errors.LastName.message}</p>
                        )}
                    </div>

                    {/* email */}
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                        <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:cursor-not-allowed" placeholder="john.doe@company.com" value={profile?.email} disabled />
                    </div>



                </div>
                <div className="mb-6">
                    <label htmlFor="Description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                    <textarea  {...register("description", {
                        required: "*Description required",
                    })}

                        id="Description" className="resize-none h-16 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Lorem ipsum dolor sit amet." />
                    {errors.description && (
                        <p className="p-1 text-xs text-red-600">{errors.description.message}</p>
                    )}
                </div>

              
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">save</button>
            </form>

        </>
    );
};

export default AddClass;
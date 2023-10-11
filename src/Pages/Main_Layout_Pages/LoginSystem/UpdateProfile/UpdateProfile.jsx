import React, { useEffect, useState } from 'react';
import SetTitle from '../../../Shared/SetTtitle/SetTitle';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import useProfile from '../../../../Hooks/useProfile';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAuthProvider from '../../../../Hooks/useAuthProvider';
import { useQuery } from 'react-query';
import LoadingPage from '../../../LoadingPage/LoadingPage/LoadingPage';
import axios from 'axios';
import LoadingPageWIthIconOnly from '../../../LoadingPage/LoadingPageWIthIconOnly/LoadingPageWIthIconOnly';
import { Navigate, useNavigate } from 'react-router-dom';

const UpdateProfile = () => {

    const { user, loading } = useAuthProvider();
    const { providerUpdateuserProfile } = useAuthProvider();
    const navigate = useNavigate();

    const axiosSecure = useAxiosSecure();
    const { refetch: profileRefetch, data: profile = {}, isLoading: profileLoading, error } = useQuery({
        queryKey: ['profile', user?.email],
        enabled: (!loading && (!!user)),
        queryFn: async () => {
            const res = await axiosSecure.get(`/get-profile/${user?.email}`);
            console.log("profile: ", res.data, '\n role : ', { role: res.data?.role })
            return res?.data;
        },
    });



    const [Gender, setGender] = useState(profile?.gender);
    const [selectedImage, setSelectedImage] = useState(profile?.photoURL);

    // upload prgress 
    const [loadOnSave, setLoadOnSave] = useState(false);

    useEffect(() => {
        setSelectedImage(profile?.photoURL)
        setGender(profile?.gender)
    }, [profile])

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setSelectedImage(URL.createObjectURL(e.target.files[0])); // Set selectedImage state with the URL
        }
    };


    const { register, formState: { errors }, handleSubmit, setValue } = useForm({ mode: "onSubmit" });

    const submission = async data => {
        setLoadOnSave(true)

        const Uploaddata = {
            name: data?.FirstName + " " + data?.LastName,
            phone: data?.phone,
            institute: data?.institute,
            gender: data?.gender,
            address: data?.address
        }

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
                    providerUpdateuserProfile(Uploaddata.name, Uploaddata?.photoURL)
                })
        } else {
            uploadToServer(Uploaddata)
        }
        setLoadOnSave(false);
    };

    const uploadToServer = data => {

        axiosSecure.patch(`/update-user-profile/${user?.email}`, data)
            .then(result => {

                Swal.fire(
                    'Successful!',
                    `Your Profile has been Updated`,
                    'success'
                )
                navigate('/dashboard/profile')

            }).catch(e => {
                // console.log(e);

                Swal.fire({
                    icon: 'error',
                    title: 'ERROR OCCURRED',
                    text: 'Error: role set unsuccessful',
                })
            })
    }
    if (profileLoading) {
        return <LoadingPage />
    }
    if (error) {

        // todo : new error page 
        return <>error</>
    }
    return (
        <>
            {
                loadOnSave && <LoadingPage />
            }
            <SetTitle title="Update profile" />
            <SectionTitle h1="Update Your Profile" />
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
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">Profile Photo</p>
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
                            defaultValue={profile?.name ? profile?.name.split(" ").slice(1).join(" ") : ""} id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" />
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
                            defaultValue={Gender}
                            {...register("gender", {
                                required: "*Gender required",
                            })}
                            onChange={(e)=>setValue('gender',e.target.value)}

                            className="block w-full py-2 px-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                    defaultValue={profile?.address}
                        id="address" className="resize-none h-16 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Silicon Valley, USA" />
                    {errors.Address && (
                        <p className="p-1 text-xs text-red-600">{errors.Address.message}</p>
                    )}
                </div>

                <div className="flex items-start mb-6">
                    <div className="flex items-center h-5">
                        <input id="remember" type="checkbox" defaultChecked className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
                    </div>
                    <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a>.</label>
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button>
            </form>

        </>
    );
};

export default UpdateProfile;
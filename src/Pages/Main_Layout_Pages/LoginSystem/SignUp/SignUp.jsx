import React, { useState } from 'react';
import './../Login.css';
import singupimg from '../../../../assets/images/icon/singupimage.jpeg';
import logoWOBG from '../../../../assets/images/icon/logo_LG_no_bg.png';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import SetTitle from '../../../Shared/SetTtitle/SetTitle';
import OtherSignInMethod from '../OtherSignInMethod/OtherSignInMethod';
import Swal from 'sweetalert2';
import useAuthProvider from '../../../../Hooks/useAuthProvider';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import useProfile from '../../../../Hooks/useProfile';
const SignUp = () => {

    const {profileRefetch} = useProfile();
    const axiosSecure = useAxiosSecure();
    const { provideCreateUserWithEmailAndPassword, provideSignOut, setLoading } = useAuthProvider();
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();


    const [showPass, setShowPass] = useState(false);
    const [pass, setPass] = useState("");
    const [Cpass, setCPass] = useState("");
    

    //pass the previous location
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';




    const onSubmit = data => {
        const email = data.email;
        const password = data?.password;
        const Cpassword = data?.Confrimpassword;
        if (!email || !password) {
            Swal.fire({
                icon: 'error',
                title: 'Unauthorized',
                text: 'Provide Necessaary Data',

            })
            return;
        }

        if (password !== Cpassword) {
            Swal.fire({
                icon: 'error',
                title: 'Unauthorized',
                text: 'Not matched password',

            })
            return;
        }

        provideCreateUserWithEmailAndPassword(email, password)
            .then(result => {

               
               <Navigate to='/update-profile' state={{ from: from }} replace></Navigate>
        

            })
            .catch(e => { setLoading(false)})

    }
    return (
        <section id="signin auth" className='mt-8 select-none transition ease-in-out delay-200 html body'>
            <SetTitle title="Sign Up" />
            <div className="container max-w-5xl mx-auto">
                <div className="signin-container w-full">
                    <div>
                        <div className="img-container">
                            <img src={singupimg} alt="Main Image" className='w-[30px] h-[680px]  rounded-xl object-cover' />
                        </div>
                    </div>
                    <div className="w-full signin-form pl-0 md:pl-10 items-center">
                        <a href="/" className="logo">
                            <img src={logoWOBG} alt="Logo" className="logo-img h-[100px] w-[340px]" />
                        </a>
                        <div className="pt-0">
                            <h1 className="heading  pl-2">Sign Up</h1>
                            <p className="paragraph hidden md:block  pl-2 text-lg">
                                Please fill your detail to create a new  account.
                            </p>
                            <form className=" w-full max-w-4xl" onSubmit={handleSubmit(onSubmit)}>
                                <div className="input-form-container">
                                    <label htmlFor="email">Email</label>
                                    <div className="input-group">
                                        <input type="email"  className='dark:bg-slate-800' id="email" {...register("email", { required: true })} title="Please Enter Valid Email Id" />

                                    </div>
                                    {errors.email?.type === "required" && (
                                        <p className='mt-1 text-base text-red-500' role="alert">E-mail is required</p>
                                    )}
                                </div>

                                <div className="input-form-container mb-0">
                                    <label htmlFor="password">Password</label>
                                    <div className="input-group relative mb-0">
                                        <input type={showPass ? 'text' : 'password'}  {...register("password", {
                                            required: "*password Area required",
                                            maxLength: {
                                                value: 80,
                                                message: "Max length is 80",
                                            },
                                            minLength: {
                                                value: 6,
                                                message: "* minimum length is 6",
                                            }
                                        })}
                                        className='dark:bg-slate-800'
                                            onChange={(e) => setPass(e.target.value)} />

                                    </div>
                                    {errors.password && (
                                        <p className='text-base mt-1 text-red-500' role="alert">{errors.password.message}</p>
                                    )}
                                </div>

                                <div className="input-form-container ">
                                    <label htmlFor="confirmPass">Confirm Password</label>
                                    <div className="input-group relative">
                                        <input
                                         className='dark:bg-slate-800'
                                            type={showPass ? 'text' : 'password'}
                                            id="confirmPass" {...register("Confrimpassword", { required: true })}
                                            onChange={(e) => setCPass(e.target.value)} />

                                    </div>
                                    {
                                        Cpass && pass !== Cpass ?
                                            <p className='mt-1 text-base text-red-500' role="alert">*Not Same with password</p>
                                            :
                                            <>
                                                {errors.Confrimpassword?.type === "required" && (
                                                    <p className='mt-1 text-base text-red-500' role="alert">*Confirm Password is required</p>
                                                )}
                                            </>

                                    }
                                </div>

                                <div className="input-form-container flex justify-start items-center gap-2">

                                    <input
                                        type="checkbox"
                                        name="see_password"
                                        id="see_password"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        value={showPass}
                                        onChange={() => setShowPass(!showPass)} />
                                    <label htmlFor="see_password">See password</label>



                                </div>



                                <div className="input-form-container mt-2 py-3">
                                    <button type="submit" className="w-full py-3 btn-primary">Create Account</button>
                                </div>





                                <OtherSignInMethod />



                                <div className="input-form-container mt-3">
                                    <p className="paragraph text-lg dark:text-white relative ">
                                        Already have an account? <Link to="/login" className='absolute px-2 hover:underline hover:text-blue-500 hover:font-semibold'>Sign In</Link>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default SignUp;

// title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
// pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
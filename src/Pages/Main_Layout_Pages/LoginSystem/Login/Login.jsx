import React, { useState } from 'react';
import './../Login.css';
import loginImg from '../../../../assets/images/icon/loginimage.jpeg';
import google from '../../../../assets/images/icon/google.svg';
import logoWOBG from '../../../../assets/images/icon/logo_LG_no_bg.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import SetTitle from '../../../Shared/SetTtitle/SetTitle';
const Login = () => {
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();


    const [showPass, setShowPass] = useState(false);
    const [errormessage, seterrormessage] = useState('');

    const navigate = useNavigate();
    //pass the previous location
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';




    const onSubmit = data => {
        console.log(data)
    }
    return (
        <section id="signin " className='mt-8 md:mt-16 select-none'>
            <SetTitle title="Login" />
            <div className="container">
                <div className="signin-container ">
                    <div className="signin-form justify-center">
                        <a href="index.html" className="logo">
                            <img src={logoWOBG} alt="Logo" className="logo-img h-[100px] w-[340px]" />
                        </a>
                        <div className="form-container pt-0">
                            <h1 className="heading">Log In</h1>
                            <p className="paragraph">
                                Please fill your detail to access your account.
                            </p>
                            <form className="signin_form" onSubmit={handleSubmit(onSubmit)}>
                                <div className="input-form-container">
                                    <label htmlFor="email">Email</label>
                                    <div className="input-group">
                                        <input type="email" id="email" {...register("email", { required: true })} title="Please Enter Valid Email Id" />
                                        {errors.email?.type === "required" && (
                                            <p className='mt-1 text-sm text-red-500' role="alert">E-mail is required</p>
                                        )}

                                    </div>
                                </div>
                                <div className="input-form-container ">
                                    <label htmlFor="password">Password</label>
                                    <div className="input-group relative">
                                        <input type={showPass ? 'text' : 'password'} id="password" {...register("password", { required: true })} />
                                        <div onClick={() => setShowPass(!showPass)} className='cursor-pointer absolute right-5 top-5'>
                                            {
                                                showPass ? <BsEyeSlash className='text-3xl' /> : <BsEye className='text-3xl' />
                                            }
                                        </div>
                                        {errors.password?.type === "required" && (
                                            <p className='mt-1 text-sm text-red-500' role="alert">Password is required</p>
                                        )}
                                    </div>
                                </div>
                                <div className="input-form-container d-flex">
                                    <div>
                                        <input type="checkbox" name="remember" id="remember" />
                                        <label htmlFor="remember">Remember me</label>
                                    </div>
                                    <a href="#!" className="link">Forgot Password?</a>
                                </div>



                                <div className="input-form-container py-3">
                                    <button type="submit" className="w-full py-3 btn-primary">Sign in</button>
                                </div>





                                <button className="w-full px-5 py-3 text-xl font-semibold flex justify-center items-center gap-3 border border-gray-500/50 rounded-2xl ">
                                    <img src={google} alt="Google" /><span>Sign in with Google</span>
                                </button>



                                <div className="input-form-container">
                                    <p className="paragraph">
                                        Don’t have an account? <Link to="/sign-up" className='hover:underline hover:text-blue-500 hover:font-semibold'>Sign up</Link>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div>
                        <div className="img-container">
                            <img src={loginImg} alt="Main Image" className='h-[700px] rounded-xl' />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;

// title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
// pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
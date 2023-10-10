import React, { useState } from 'react';
import './../Login.css';
import loginImg from '../../../../assets/images/icon/loginimage.jpeg';
import logoWOBG from '../../../../assets/images/icon/logo_LG_no_bg.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import SetTitle from '../../../Shared/SetTtitle/SetTitle';
import OtherSignInMethod from '../OtherSignInMethod/OtherSignInMethod';
import useAuthProvider from '../../../../Hooks/useAuthProvider';
import Swal from 'sweetalert2';
const Login = () => {

    const {provideSignInWithEmailAndPassword, setLoading} = useAuthProvider();
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();


    const [showPass, setShowPass] = useState(false);
 

    const navigate = useNavigate();
    //pass the previous location
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';




    const onSubmit = data => {
        const email = data.email;
        const password = data?.password;
        if(!email || !password){
            Swal.fire({
                icon: 'error',
                title: 'Unauthorized',
                text: 'Provide Necessaary Data',
                
              })
              return;
        }
        provideSignInWithEmailAndPassword(email,password)
        .then(result => {
            navigate(from,{replace:true});
        }).catch(e => {setLoading(false) })
    }
    return (
        <section id="signin auth" className='mt-8 md:mt-8 select-none html body'>
            <SetTitle title="Login" />
            <div className="container">
                <div className="signin-container ">
                    <div className="signin-form justify-center">
                        <a href="/" className="logo p-0">
                            <img src={logoWOBG} alt="Logo" className=" h-[80px] w-[320px]" />
                        </a>
                        <div className="form-container pt-0 mt-0">
                            <h1 className="heading pl-2">Log In</h1>
                            <p className="paragraph pl-2 text-lg">
                                Please fill your detail to access your account.
                            </p>
                            <form className="signin_form" onSubmit={handleSubmit(onSubmit)}>
                                <div className="input-form-container">
                                    <label htmlFor="email">Email</label>
                                    <div className="input-group">
                                        <input type="email" id="email" {...register("email", { required: true })} title="Please Enter Valid Email Id" />

                                    </div>
                                    {errors.email?.type === "required" && (
                                        <p className='mt-1 text-base text-red-500' role="alert">E-mail is required</p>
                                    )}
                                </div>
                                <div className="input-form-container ">
                                    <label htmlFor="password">Password</label>
                                    <div className="input-group relative">
                                        <input type={showPass ? 'text' : 'password'} id="password" {...register("password", { required: true })} />
                                        <div onClick={() => setShowPass(!showPass)} className='cursor-pointer absolute right-5 top-2'>
                                            {
                                                showPass ? <BsEyeSlash className='text-2xl' /> : <BsEye className='text-2xl' />
                                            }
                                        </div>
                                    </div>
                                    {errors.password?.type === "required" && (
                                        <p className='mt-1 text-base text-red-500' role="alert">Password is required</p>
                                    )}
                                </div>
                                <div className="input-form-container d-flex">
                                    <div>
                                        <input type="checkbox" name="remember" id="remember" />
                                        <label htmlFor="remember">Remember me</label>
                                    </div>
                                    <Link to="/forget-password" className="link text-lg">Forgot Password?</Link>
                                </div>



                                <div className="input-form-container py-3">
                                    <button type="submit" className="w-full py-3 btn-primary">Sign in</button>
                                </div>





                                <OtherSignInMethod />



                                <div className="input-form-container text-lg">
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
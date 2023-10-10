import React from 'react';
import { ImCancelCircle } from 'react-icons/im'
import useAuthProvider from '../../../../Hooks/useAuthProvider';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
const Forgetpassword = () => {
    const { providerPasswordReset } = useAuthProvider();


    const handleForgetPassword = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        console.log(email);
        if (!email) {
            Swal.fire({
                icon: 'error',
                title: 'Unauthorized',
                text: 'Provide Necessaary Data',

            })
            return;
        }
        providerPasswordReset(email)
            .then(data => {
                Swal.fire({
                    title: 'E-mail sent',
                    text: "Open the Link to Change Password",
                    icon: 'success',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Check Email'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.open('https://mail.google.com/mail/u/0/?tab=rm&ogbl#search/mr.x', '_blank');
                    }
                })
            })
            .catch(e => {

            })
    }

    return (
        <form className='max-w-xl mx-auto mt-20' onSubmit={handleForgetPassword}>
            <SectionTitle h1="Forget Password?" />
            <label htmlFor="email-address-icon" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
            <div className="relative mb-3">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                        <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                        <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                    </svg>
                </div>
                <input type="email" id="email-address-icon" name='email' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@cinematic.com" />

            </div>
            <div className='flex justify-center items-center'>

                <button type="submit" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Send Email</button>
            </div>
            <div className="input-form-container">
                <p className="paragraph">
                   <Link to="/login" className='hover:underline hover:text-blue-500 hover:font-semibold'>Go to Sign In</Link>
                </p>
            </div>
        </form>

    );
};

export default Forgetpassword;
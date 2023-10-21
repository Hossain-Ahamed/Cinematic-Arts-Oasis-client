import React, { createContext, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../../Pages/Shared/Header/Header';
import Footer from '../../Pages/Shared/Footer/Footer';
import ToasterProvider from '../../components/Toastprovider/ToastProvider';

const Main = () => {

    const location = useLocation();
    const noHeaderFooterArray = ['/login', '/sign-up', '/forget-password'];
    const noHeadFoot = noHeaderFooterArray.some((str) =>
        str.toLowerCase() === location.pathname.toLowerCase()
    );


    return (

        <section className='bg-white dark:bg-slate-800 text-black dark:text-white min-h-screen'>
            {noHeadFoot || <Header />}
            <main className='relative  max-w-[1500px] mx-auto' >
                <Outlet />
            </main>
            {noHeadFoot || <Footer />}

            <ToasterProvider />
        </section>
    );
};

export default Main;
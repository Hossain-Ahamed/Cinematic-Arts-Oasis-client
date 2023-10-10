import React, { createContext, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../../Pages/Shared/Header/Header';
import Footer from '../../Pages/Shared/Footer/Footer';
import ToasterProvider from '../../components/Toastprovider/ToastProvider';

export const ThemeDarkLightContext = createContext();
const Main = () => {
    const [theme, setTheme] = useState(null);

    const location = useLocation();
    const noHeaderFooterArray = ['/login', '/sign-up', '/forget-password'];
    const noHeadFoot = noHeaderFooterArray.some((str) =>
        str.toLowerCase() === location.pathname.toLowerCase()
    );



    useEffect(() => {
        if (localStorage.getItem("c_art_THEME") === 'dark') {
            setTheme("dark")
        } else if (localStorage.getItem("c_art_THEME") === 'light') {
            setTheme('light')
        } else {
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                setTheme("dark")
            } else {
                setTheme("light")
            }
        }
    }, [])

    useEffect(() => {
        if (theme === "dark") {
            localStorage.setItem("c_art_THEME", "dark")
            document.documentElement.classList.add("dark")
        } else if (theme === "light") {
            localStorage.setItem("c_art_THEME", "light")
            document.documentElement.classList.remove("dark")
        }
    }, [theme])

    return (
        <ThemeDarkLightContext.Provider value={{ theme, setTheme }}>
            <>
                {noHeadFoot || <Header />}
                <main>
                    <Outlet />
                </main>
                {noHeadFoot || <Footer />}
            </>
            <ToasterProvider />
        </ThemeDarkLightContext.Provider>
    );
};

export default Main;
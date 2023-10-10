import React from 'react';
import ThemeButton from '../../../components/Theme/ThemeButton';
import logoWBg from '../../../assets/images/icon/logo png.png'
import { Link, NavLink } from 'react-router-dom';
import useAuthProvider from '../../../Hooks/useAuthProvider';


const Header = () => {

    const { user, provideSignOut } = useAuthProvider();

    const nav = [
        {
            name: "Home",
            url: "/"

        },
        {
            name: "Instructor",
            url: "/instructor"

        },
        {
            name: "Classes",
            url: "/classes"

        },
        {
            name: "Dashboard",
            url: "/dashboard"

        },

    ]


    const NavClass = ["block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent  "];



    return (

        <header className="bg-gray-200/50 border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">


                <Link to="/" className="flex items-center">
                    <img src={logoWBg} className="h-14 w-44 mr-3 " alt="Logo" />

                </Link>

                <nav className='flex justify-end  items-center gap-3'>

                    <div className="hidden w-full md:block md:w-auto" id="navbar-default">

                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border  rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">

                            {
                                nav.map((item, _idx) =>
                                    <li key={_idx}>
                                        <NavLink
                                            to={item?.url}
                                            className={({ isActive, isPending }) =>
                                                isActive
                                                    ? [...NavClass, "text-red-500"].join('')
                                                    : [...NavClass]
                                            }

                                        >
                                            {item?.name}
                                        </NavLink>
                                    </li>
                                )
                            }
                            {

                            }


                            {
                                user ?
                                    <li  >

                                        <div className="dropdown dropdown-end">
                                            <label tabIndex={0} className={[...NavClass]}>Profile</label>
                                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                                <li className={[...NavClass]}><NavLink>See profile</NavLink></li>
                                                <li onClick={provideSignOut}>Log Out</li>
                                            </ul>
                                        </div>


                                    </li>

                                    :
                                    <li >
                                        <NavLink to="/login" className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-800">JOIN NOW</NavLink>
                                    </li>

                            }

                        </ul>
                    </div>

                    <ThemeButton />


                    <div data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center text-xl p-2 w-16 h-10 justify-center  text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 relative" aria-controls="navbar-default" aria-expanded="false">
                        <label htmlFor='top-nav-collapsable-menu' className='peer-checked:bg-orange-400'>
                            <span className="sr-only">Open main menu</span>

                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>


                        </label>
                        <input type="checkbox" id="top-nav-collapsable-menu" className='peer top-nav-collapsable-menu' hidden />



                        {/* mobile nav  */}
                        <label className='absolute top-full right-3 hidden peer-checked:block'>

                            <ul className="font-medium flex flex-col p-2 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-100 border-gray-700/50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                                {
                                    nav.map((item, _idx) =>
                                        <li key={_idx}>
                                            <NavLink
                                                to={item?.url}
                                                className={({ isActive }) =>
                                                    isActive
                                                        ? [...NavClass, "text-red-500"].join('')
                                                        : [...NavClass]
                                                }

                                            >
                                                {item?.name}
                                            </NavLink>
                                        </li>
                                    )
                                }
                                <li >
                                    {
                                        user ?
                                            <>
                                                <NavLink
                                                    to="/dashboard/profile"
                                                    className={({ isActive }) =>
                                                        isActive
                                                            ? [...NavClass, "text-red-500"].join('')
                                                            : [...NavClass]
                                                    }

                                                >
                                                    Profile
                                                </NavLink>
                                                <li >
                                                    <button
                                                        className={[...NavClass]}
                                                        onClick={provideSignOut}

                                                    >
                                                        Sign Out
                                                    </button>
                                                </li>
                                            </>
                                            :
                                            <NavLink to="/login" className={[...NavClass]}>Join Now</NavLink>
                                    }
                                </li>




                            </ul>


                        </label>


                    </div>

                </nav>
            </div>
        </header>

    );

};

export default Header;
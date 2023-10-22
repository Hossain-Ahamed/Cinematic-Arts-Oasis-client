import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav_Instructor = () => {
    return (
        <ul className="space-y-2 font-medium">
            <li>
                <NavLink to="/dashboard" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <svg className='flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 4.5V18C10 19.08 9.55999 20.07 8.85999 20.79L8.82001 20.83C8.73001 20.92 8.63001 21.01 8.54001 21.08C8.24001 21.34 7.89999 21.54 7.54999 21.68C7.43999 21.73 7.33 21.77 7.22 21.81C6.83 21.94 6.41 22 6 22C5.73 22 5.46001 21.97 5.20001 21.92C5.07001 21.89 4.94 21.86 4.81 21.82C4.65 21.77 4.50001 21.72 4.35001 21.65C4.35001 21.64 4.35 21.64 4.34 21.65C4.06 21.51 3.79001 21.35 3.54001 21.16L3.53 21.15C3.4 21.05 3.28001 20.95 3.17001 20.83C3.06001 20.71 2.95 20.59 2.84 20.46C2.65 20.21 2.49001 19.94 2.35001 19.66C2.36001 19.65 2.36001 19.65 2.35001 19.65C2.35001 19.65 2.35 19.64 2.34 19.63C2.28 19.49 2.22999 19.34 2.17999 19.19C2.13999 19.06 2.10999 18.93 2.07999 18.8C2.02999 18.54 2 18.27 2 18V4.5C2 3 3 2 4.5 2H7.5C9 2 10 3 10 4.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M22 16.5V19.5C22 21 21 22 19.5 22H6C6.41 22 6.83 21.94 7.22 21.81C7.33 21.77 7.43999 21.73 7.54999 21.68C7.89999 21.54 8.24001 21.34 8.54001 21.08C8.63001 21.01 8.73001 20.92 8.82001 20.83L8.85999 20.79L15.66 14H19.5C21 14 22 15 22 16.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M4.81 21.8199C4.21 21.6399 3.64001 21.3099 3.17001 20.8299C2.69001 20.3599 2.35999 19.7899 2.17999 19.1899C2.56999 20.4399 3.56 21.4299 4.81 21.8199Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M18.37 11.2899L15.66 14L8.85999 20.7899C9.55999 20.0699 10 19.08 10 18V8.33995L12.71 5.62996C13.77 4.56996 15.19 4.56996 16.25 5.62996L18.37 7.74996C19.43 8.80996 19.43 10.2299 18.37 11.2899Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M6 19C6.55228 19 7 18.5523 7 18C7 17.4477 6.55228 17 6 17C5.44772 17 5 17.4477 5 18C5 18.5523 5.44772 19 6 19Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>

                    <span className="ml-3">Dashboard</span>
                </NavLink>
            </li>

            <li>
                <NavLink to="my-classes" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <svg className='flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.97 22.75H8.96997C3.53997 22.75 1.21997 20.43 1.21997 15V9C1.21997 3.57 3.53997 1.25 8.96997 1.25H10.97C11.38 1.25 11.72 1.59 11.72 2C11.72 2.41 11.38 2.75 10.97 2.75H8.96997C4.35997 2.75 2.71997 4.39 2.71997 9V15C2.71997 19.61 4.35997 21.25 8.96997 21.25H14.97C19.58 21.25 21.22 19.61 21.22 15V13C21.22 12.59 21.56 12.25 21.97 12.25C22.38 12.25 22.72 12.59 22.72 13V15C22.72 20.43 20.41 22.75 14.97 22.75Z" fill="currentColor" />
                        <path d="M12.7801 15.24C12.6301 15.24 12.4901 15.2 12.3601 15.11C12.1501 14.97 12.0301 14.74 12.0301 14.49C12.0301 14.38 12.0201 14.26 12.0001 14.14C11.9301 13.61 11.6901 13.14 11.2901 12.73C10.8801 12.32 10.3801 12.06 9.83009 11.99C9.75009 11.98 9.62009 11.97 9.50009 11.98C9.25009 12 9.00009 11.89 8.85009 11.69C8.70009 11.49 8.66009 11.22 8.74009 10.98C8.86009 10.64 9.05009 10.32 9.27009 10.07L10.5001 8.53C12.6401 5.86 16.9501 2.66 20.1301 1.39C20.8601 1.11 21.6301 1.27 22.1601 1.8C22.7101 2.35 22.8701 3.13 22.5801 3.84C21.3101 7.01 18.1101 11.33 15.4501 13.46L13.8801 14.72C13.5701 14.94 13.3201 15.09 13.0601 15.19C12.9701 15.22 12.8701 15.24 12.7801 15.24ZM10.7201 10.67C11.3301 10.87 11.8801 11.21 12.3501 11.67C12.8101 12.13 13.1401 12.66 13.3301 13.23L14.5101 12.28C17.0001 10.28 20.0001 6.24 21.1901 3.27C21.2701 3.08 21.1801 2.94 21.1001 2.85C21.0501 2.8 20.9101 2.69 20.6801 2.78C17.7201 3.97 13.6801 6.97 11.6801 9.46L10.7201 10.67Z" fill="currentColor" />
                        <path d="M7.69999 18.75C7.05999 18.75 6.44999 18.5 5.98999 18.04C5.45999 17.51 5.19999 16.78 5.28999 16.03L5.49999 14.07C5.71999 12.04 7.36999 10.54 9.43999 10.5C9.59999 10.49 9.79999 10.5 9.98999 10.51C10.9 10.63 11.71 11.03 12.35 11.68C12.99 12.32 13.38 13.08 13.49 13.94C13.52 14.13 13.53 14.32 13.53 14.5C13.53 15.59 13.11 16.62 12.34 17.39C11.71 18.02 10.89 18.41 9.95999 18.53L7.97999 18.74C7.87999 18.75 7.78999 18.75 7.69999 18.75ZM9.59999 11.99C9.56999 11.99 9.52999 11.99 9.49999 11.99C8.34999 12.02 7.13999 12.79 6.98999 14.23L6.77999 16.2C6.74999 16.49 6.84999 16.78 7.04999 16.98C7.24999 17.18 7.52999 17.28 7.80999 17.25L9.77999 17.04C10.36 16.97 10.88 16.72 11.27 16.33C11.75 15.84 12.02 15.2 12.02 14.5C12.02 14.39 12.01 14.27 11.99 14.15C11.92 13.62 11.68 13.15 11.28 12.74C10.87 12.33 10.37 12.07 9.81999 12C9.76999 11.99 9.68999 11.99 9.59999 11.99Z" fill="currentColor" />
                        <path d="M15.82 12.73C15.41 12.73 15.07 12.39 15.07 11.98C15.07 10.31 13.71 8.94 12.03 8.94C11.62 8.94 11.28 8.6 11.28 8.19C11.28 7.78 11.62 7.44 12.03 7.44C14.53 7.44 16.57 9.47 16.57 11.98C16.57 12.39 16.24 12.73 15.82 12.73Z" fill="currentColor" />
                    </svg>

                    <span className="flex-1 ml-3 whitespace-nowrap">My Classes</span>
                    <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">Pro</span>
                </NavLink>
            </li>
            <li>
                <NavLink to="add-class" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <svg className='flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21.19 8.0399L18.01 4.85991C16.81 3.65991 15.16 3.71993 14.35 5.00993L12.58 7.80992L18.25 13.4799L21.05 11.7099C22.26 10.9399 22.33 9.1699 21.19 8.0399Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M18.25 13.47L18.49 17.59C18.72 19.89 17.92 20.69 15.74 20.95L7.02 21.98C5.18 22.19 3.86 20.87 4.08 19.04L5.06 10.76" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12.58 7.80994L10.83 7.69995" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M5.28 20.7799L8.46001 17.5898" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M11 6.5C11 6.91 10.94 7.32001 10.83 7.70001C10.72 8.10001 10.56 8.47001 10.35 8.82001C10.11 9.22001 9.81001 9.58 9.46001 9.88C8.67001 10.58 7.64 11 6.5 11C5.99 11 5.51 10.92 5.06 10.76C4.04 10.42 3.18999 9.72001 2.64999 8.82001C2.23999 8.14001 2 7.34 2 6.5C2 5.08 2.65 3.80999 3.69 2.98999C4.46 2.36999 5.44 2 6.5 2C8.99 2 11 4.01 11 6.5Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M6.52 8.18005V4.82007" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M8.16 6.5H4.8" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>

                    <span className="flex-1 ml-3 whitespace-nowrap">Add a Class</span>
                </NavLink>
            </li>

            <li>
                <NavLink to="followers" className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
                    <svg className='flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.86 8.08997C19.86 8.50997 19.83 8.91997 19.78 9.30997C19.32 9.10997 18.82 8.99997 18.29 8.99997C17.07 8.99997 15.99 9.58996 15.32 10.49C14.64 9.58996 13.56 8.99997 12.34 8.99997C10.29 8.99997 8.63 10.67 8.63 12.74C8.63 15.42 10.05 17.47 11.63 18.86C11.58 18.89 11.53 18.9 11.48 18.92C11.18 19.03 10.68 19.03 10.38 18.92C7.79 18.03 2 14.35 2 8.08997C2 5.32997 4.21999 3.09998 6.95999 3.09998C8.58999 3.09998 10.03 3.87997 10.93 5.08997C11.84 3.87997 13.28 3.09998 14.9 3.09998C17.64 3.09998 19.86 5.32997 19.86 8.08997Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M22 12.74C22 17.42 17.67 20.18 15.73 20.84C15.5 20.92 15.13 20.92 14.9 20.84C14.07 20.56 12.8 19.89 11.63 18.86C10.05 17.47 8.63 15.42 8.63 12.74C8.63 10.67 10.29 9 12.34 9C13.56 9 14.64 9.58999 15.32 10.49C15.99 9.58999 17.07 9 18.29 9C18.82 9 19.32 9.11 19.78 9.31C21.09 9.89 22 11.2 22 12.74Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>

                    <span className="ml-3">Followers</span>
                </NavLink>
            </li>



        </ul>
    );
};

export default Nav_Instructor;
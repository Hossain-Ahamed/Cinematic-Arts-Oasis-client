import React from 'react';
import { Helmet } from 'react-helmet-async';
import useProfile from '../../../../Hooks/useProfile';
import ScrollToTop from '../../../../components/ScrollToTop/ScrollToTop';
import LoadingPage from '../../../LoadingPage/LoadingPage/LoadingPage';
import { ErrorIcon } from 'react-hot-toast';

const InstructorHome = () => {
    const {profile,role,profileLoading,profileError} = useProfile();



    if(profileError){
        return <ErrorIcon/>
    }

    if(profileLoading){
        return <LoadingPage/>
    }
    return (
        <section className=''>
        <Helmet>
            <title>  Instructor | Cinematic </title>
        </Helmet>

    

        <div className="stats stats-vertical md:stats-horizontal shadow mt-5 w-full max-w-7xl bg">

            <div className="stat">

                <div className="stat-value ">{profile?.name}</div>
                <div className="stat-title">{profile?.phone}</div>
                <div className="stat-desc">{profile?.email}</div>
                <div className="stat-figure text-secondary">
                    <div className="avatar online">
                        <div className="w-16 rounded-full">
                            <img src={profile?.photoURL} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="stat">
                <div className="stat-figure ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                </div>
                <div className="stat-title">Followers</div>
                <div className="stat-value">{10}</div>
                {/* <div className="stat-desc ">Total items in restaurant </div> */}
            </div>
            <div className="stat">
                <div className="stat-figure text-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                </div>
                <div className="stat-title">Total Classes</div>
                <div className="stat-value text-secondary">{6}</div>
                <div className="stat-desc">{role} panel</div>
            </div>



        </div>


        <ScrollToTop />
    </section>
    );
};

export default InstructorHome;
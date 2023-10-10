import React from 'react';
import VideoPlayer from './VideoPlayer';
import loadingGIF from '../../../assets/videos/loadinng 1_1 new.gif';

const LoadingPage = () => {
    return (
        <div className='max-w-screen h-screen flex justify-center items-center bg-black z-[100] overflow-hidden'>
            {/* <VideoPlayer/> */}
            <img src={loadingGIF} alt="" className=''/>
        </div>
    );
};

export default LoadingPage;
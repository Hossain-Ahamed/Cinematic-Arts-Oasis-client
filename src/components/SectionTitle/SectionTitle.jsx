import React from 'react';

const SectionTitle = ({ h1, h2, h3, p }) => {
    return (
        <>
            {h1 && <div className='text-center my-5 text-slate-700 dark:text-white  '><h1 className='text-3xl font-bold'>{h1}</h1></div>}
            {h2 && <div className='text-center my-5 text-slate-700 dark:text-white  '><h2 className='text-2xl font-semibold'>{h2}</h2></div>}
            {h3 && <div className='text-center my-5 text-slate-700 dark:text-white  '><h3 className='text-xl font-medium'>{h3}</h3></div>}
            {p && <div className='text-center my-5 text-slate-700 dark:text-white   '><p className='text-lg'>{p}</p></div>}

        </>
    );
};

export default SectionTitle;
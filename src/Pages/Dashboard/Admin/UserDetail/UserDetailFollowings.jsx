import React from 'react';
import Instructorcard from '../../../Main_Layout_Pages/Instructor/Instructorcard';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';

const UserDetailFollowings = ({ followings }) => {
    return (
        <>
        <SectionTitle h3={"Followings "}/>
            <div className='mt-5 flex justify-center items-center flex-wrap gap-5'>
                {
                    followings && Array.isArray(followings)
                    && followings.map((data, _idx) => <Instructorcard key={_idx} data={data} />)
                }
            </div>
        </>
    );
};

export default UserDetailFollowings;
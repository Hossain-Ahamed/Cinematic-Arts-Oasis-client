import React from 'react';
import { Helmet } from 'react-helmet-async';

const SetTitle = ({ title }) => {
    return (
        <>
            <Helmet>
                <title>Cinematic Arts Oasis | {title}</title>
            </Helmet>
        </>
    );
};

export default SetTitle;
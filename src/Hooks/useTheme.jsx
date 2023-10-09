import React, { useContext } from 'react';
import { ThemeDarkLightContext } from '../Layout/Main/Main';

const useTheme = () => {
    const theme = useContext(ThemeDarkLightContext);
    return theme;
};

export default useTheme;
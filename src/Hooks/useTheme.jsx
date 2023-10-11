import React, { useContext } from 'react';
import { ThemeDarkLightContext } from '../Contexts/ThemeProvider/ThemeProvider';


const useTheme = () => {
    const theme = useContext(ThemeDarkLightContext);
    return theme;
};

export default useTheme;
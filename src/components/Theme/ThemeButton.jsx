import React from 'react';

import sun from '../../assets/images/theme/sun.png'
import moon from '../../assets/images/theme/moon.png'
import useTheme from '../../Hooks/useTheme';

const ThemeButton = () => {
    const {theme,setTheme} = useTheme();
    return (
        <button className="switch_btn w-[68px] h-8 " aria-label='thme-change-button' onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            <img src={sun} alt="sun image" />
            <img src={moon} alt="moon image" />
            <input type="checkbox" className="virtual_btn" id="theme_switch" checked={(theme === "dark") ? true : false} />
            <span className="circle"></span>
        </button>
    );
};

export default ThemeButton;
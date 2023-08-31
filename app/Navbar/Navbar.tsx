import React from 'react';
import {ThemeSwitcher} from "@/app/ThemeSwitcher/ThemeSwitcher";

const Navbar = () => {
    return (
        <div className={'flex justify-between items-center px-4 py-4'}>
            <ThemeSwitcher/>
        </div>
    );
};

export default Navbar;
'use client';

import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { BsFillMoonFill, BsSunFill } from "react-icons/bs";

const ToggleTheme = () => {
    const {resolvedTheme, setTheme} = useTheme();

    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if(!mounted){
        return null;
    }

    return (
        <button aria-label="Choose page theme" onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')} className="text-black dark:text-white rounded-full hover:bg-neutral-100 dark:hover:bg-zinc-950 transition p-2">
            {resolvedTheme === 'dark' ? ( <BsSunFill size={20} /> ) : ( <BsFillMoonFill size={20} /> )}
        </button>
    )
}

export default ToggleTheme;
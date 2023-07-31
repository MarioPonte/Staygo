'use client';

import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

const ToggleTheme = () => {
    const {resolvedTheme, setTheme} = useTheme();

    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if(!mounted){
        return null;
    }

    return (
        <button onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')} className="text-black dark:text-red-500">
            {resolvedTheme === 'dark' ? 'light' : 'dark'}
        </button>
    )
}

export default ToggleTheme;
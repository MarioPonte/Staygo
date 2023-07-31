'use client';

import { ThemeProvider } from 'next-themes';

const ThemesProvider = ({children}) => {
    return (
        <ThemeProvider attribute='class'>{children}</ThemeProvider>
    )
}

export default ThemesProvider;
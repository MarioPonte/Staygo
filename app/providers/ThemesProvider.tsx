'use client';

import { ThemeProvider } from 'next-themes';

const ThemesProvider = ({children}: any) => {
    return (
        <ThemeProvider attribute='class'>{children}</ThemeProvider>
    )
}

export default ThemesProvider;
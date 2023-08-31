"use client";

import {useTheme} from "next-themes";
import {useEffect, useState} from "react";
import {Button} from "@nextui-org/react";
import {MoonIcon} from "@/app/shared/MoonIcom";
import {SunIcon} from "@/app/shared/SunIcon";

export function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    if(!mounted) return <Button/>

    return (
            <Button
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
                {theme === 'light' ? <MoonIcon/> : <SunIcon/>}
            </Button>
    )
}


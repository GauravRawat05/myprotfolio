"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Particles } from "@/components/ui/particles"

export function ParticleBackground() {
    const { theme } = useTheme()
    const [color, setColor] = useState("#ffffff")

    useEffect(() => {
        setColor(theme === "dark" ? "#ffffff" : "#000000")
    }, [theme])

    return (
        <Particles
            className="fixed inset-0 -z-10 animate-fade-in"
            quantity={100}
            ease={80}
            color={color}
            refresh
        />
    )
}

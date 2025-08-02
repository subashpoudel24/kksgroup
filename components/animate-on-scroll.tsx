"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface AnimateOnScrollProps {
    children: React.ReactNode
    delay?: number
    className?: string
    animationType?: "fade-up" | "fade-scale" | "fade-left" | "fade-right"
    threshold?: number
}

export function AnimateOnScroll({
    children,
    delay = 0,
    className,
    animationType = "fade-up",
    threshold = 0.1,
}: AnimateOnScrollProps) {
    const [isVisible, setIsVisible] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    observer.unobserve(entry.target) // Stop observing once visible
                }
            },
            {
                threshold,
            },
        )

        if (ref.current) {
            observer.observe(ref.current)
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current)
            }
        }
    }, [threshold])

    const animationClasses = {
        "fade-up": isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
        "fade-scale": isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95",
        "fade-left": isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10",
        "fade-right": isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10",
    }

    return (
        <div
            ref={ref}
            className={cn("transition-all duration-1000 ease-out", animationClasses[animationType], className)}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    )
}

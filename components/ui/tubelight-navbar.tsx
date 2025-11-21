"use client"

import React, { useState, useRef, useEffect } from 'react'
import { motion, useSpring, AnimatePresence } from 'framer-motion'
import Link from "next/link"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { ModeToggle } from "@/components/mode-toggle"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
}

export function NavBar({ items, className }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0].name)
  const [expanded, setExpanded] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [windowWidth, setWindowWidth] = useState(0) // Initialize with 0 to avoid hydration mismatch
  const containerRef = useRef<HTMLDivElement>(null)
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      setIsMobile(width < 768)
      setWindowWidth(width)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Calculate widths
  const collapsedWidth = 140
  // Dynamic width based on items count + buffer for ModeToggle
  const expandedWidth = isMobile
    ? Math.min(items.length * 90 + 100, windowWidth * 0.95)
    : Math.min(items.length * 120 + 100, 900)

  const pillWidth = useSpring(collapsedWidth, { stiffness: 220, damping: 25, mass: 1 })

  useEffect(() => {
    const sections = items.map((item) => item.url.replace("#", ""))
    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const activeId = entry.target.id
          const activeItem = items.find((item) => item.url === `#${activeId}`)
          if (activeItem) {
            setActiveTab(activeItem.name)
          }
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    sections.forEach((id) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      sections.forEach((id) => {
        const element = document.getElementById(id)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [items])

  useEffect(() => {
    if (hovering) {
      setExpanded(true)
      pillWidth.set(expandedWidth)
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
    } else {
      hoverTimeoutRef.current = setTimeout(() => {
        setExpanded(false)
        pillWidth.set(collapsedWidth)
      }, 600)
    }

    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
    }
  }, [hovering, pillWidth, expandedWidth])

  return (
    <div className={cn("fixed top-6 left-1/2 -translate-x-1/2 z-50 max-w-full", className)}>
      <motion.nav
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        className="relative rounded-full"
        style={{
          width: pillWidth,
          height: '36px',
          background: 'rgba(255, 255, 255, 0.0)',
          backdropFilter: 'blur(1px)',
          border: '0px solid rgba(255, 255, 255, 0.1)',
          boxShadow: expanded
            ? `
              0 2px 4px rgba(0, 0, 0, 0.08),
              0 6px 12px rgba(0, 0, 0, 0.12),
              0 12px 24px rgba(0, 0, 0, 0.14),
              0 24px 48px rgba(0, 0, 0, 0.10),
              inset 0 2px 2px rgba(255, 255, 255, 0.8),
              inset 0 -3px 8px rgba(0, 0, 0, 0.12),
              inset 3px 3px 8px rgba(0, 0, 0, 0.10),
              inset -3px 3px 8px rgba(0, 0, 0, 0.09),
              inset 0 -1px 2px rgba(0, 0, 0, 0.08)
            `
            : `
              0 3px 6px rgba(0, 0, 0, 0.12),
              0 8px 16px rgba(0, 0, 0, 0.10),
              0 16px 32px rgba(0, 0, 0, 0.08),
              0 1px 2px rgba(0, 0, 0, 0.12),
              inset 0 2px 1px rgba(255, 255, 255, 0.7),
              inset 0 -2px 6px rgba(0, 0, 0, 0.10),
              inset 2px 2px 8px rgba(0, 0, 0, 0.08),
              inset -2px 2px 8px rgba(0, 0, 0, 0.07),
              inset 0 0 1px rgba(0, 0, 0, 0.15)
            `,
          overflow: 'hidden',
          transition: 'box-shadow 0.3s ease-out',
        }}
      >
        {/* Primary top edge ridge - ultra bright */}
        <div
          className="absolute inset-x-0 top-0 rounded-t-full pointer-events-none"
          style={{
            height: '2px',
            background: 'linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.95) 5%, rgba(255, 255, 255, 1) 15%, rgba(255, 255, 255, 1) 85%, rgba(255, 255, 255, 0.95) 95%, rgba(255, 255, 255, 0) 100%)',
            filter: 'blur(0.3px)',
          }}
        />

        {/* Top hemisphere light catch */}
        <div
          className="absolute inset-x-0 top-0 rounded-full pointer-events-none"
          style={{
            height: '55%',
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.25) 30%, rgba(255, 255, 255, 0.10) 60%, rgba(255, 255, 255, 0) 100%)',
          }}
        />

        {/* Directional light - top left */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.40) 0%, rgba(255, 255, 255, 0.20) 20%, rgba(255, 255, 255, 0.08) 40%, rgba(255, 255, 255, 0) 65%)',
          }}
        />

        {/* Premium gloss reflection - main */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            left: expanded ? '18%' : '15%',
            top: '16%',
            width: expanded ? '140px' : '60px',
            height: '14px',
            background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.70) 0%, rgba(255, 255, 255, 0.35) 40%, rgba(255, 255, 255, 0.10) 70%, rgba(255, 255, 255, 0) 100%)',
            filter: 'blur(4px)',
            transform: 'rotate(-12deg)',
            transition: 'all 0.3s ease',
          }}
        />

        {/* Secondary gloss accent - only show when expanded */}
        {expanded && (
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              right: '22%',
              top: '20%',
              width: '80px',
              height: '10px',
              background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.50) 0%, rgba(255, 255, 255, 0.15) 60%, rgba(255, 255, 255, 0) 100%)',
              filter: 'blur(3px)',
              transform: 'rotate(8deg)',
            }}
          />
        )}

        {/* Left edge illumination - only show when expanded */}
        {expanded && (
          <div
            className="absolute inset-y-0 left-0 rounded-l-full pointer-events-none"
            style={{
              width: '35%',
              background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.20) 0%, rgba(255, 255, 255, 0.10) 40%, rgba(255, 255, 255, 0.03) 70%, rgba(255, 255, 255, 0) 100%)',
            }}
          />
        )}

        {/* Right edge shadow - only show when expanded */}
        {expanded && (
          <div
            className="absolute inset-y-0 right-0 rounded-r-full pointer-events-none"
            style={{
              width: '35%',
              background: 'linear-gradient(270deg, rgba(0, 0, 0, 0.10) 0%, rgba(0, 0, 0, 0.05) 40%, rgba(0, 0, 0, 0.02) 70%, rgba(0, 0, 0, 0) 100%)',
            }}
          />
        )}

        {/* Bottom curvature - deep shadow */}
        <div
          className="absolute inset-x-0 bottom-0 rounded-b-full pointer-events-none"
          style={{
            height: '50%',
            background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.14) 0%, rgba(0, 0, 0, 0.08) 25%, rgba(0, 0, 0, 0.03) 50%, rgba(0, 0, 0, 0) 100%)',
          }}
        />

        {/* Bottom edge contact shadow */}
        <div
          className="absolute inset-x-0 bottom-0 rounded-b-full pointer-events-none"
          style={{
            height: '20%',
            background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0) 100%)',
            filter: 'blur(2px)',
          }}
        />

        {/* Inner diffuse glow */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            boxShadow: 'inset 0 0 40px rgba(255, 255, 255, 0.22)',
            opacity: 0.7,
          }}
        />

        {/* Micro edge definition */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            boxShadow: 'inset 0 0 0 0.5px rgba(0, 0, 0, 0.10)',
          }}
        />

        {/* Navigation items container */}
        <div
          ref={containerRef}
          className="relative z-10 h-full flex items-center justify-center px-6"
          style={{
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "SF Pro", Poppins, sans-serif',
          }}
        >
          {/* Collapsed state - show only active section with smooth text transitions */}
          {!expanded && (
            <div className="flex items-center relative">
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeTab}
                  initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
                  transition={{
                    duration: 0.35,
                    ease: [0.4, 0.0, 0.2, 1]
                  }}
                  className="text-foreground"
                  style={{
                    fontSize: '15.5px',
                    fontWeight: 680,
                    letterSpacing: '0.45px',
                    whiteSpace: 'nowrap',
                    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "SF Pro Display", Poppins, sans-serif',
                    WebkitFontSmoothing: 'antialiased',
                    MozOsxFontSmoothing: 'grayscale',
                    textShadow: `
                      0 1px 0 rgba(0, 0, 0, 0.35),
                      0 -1px 0 rgba(255, 255, 255, 0.8),
                      1px 1px 0 rgba(0, 0, 0, 0.18),
                      -1px 1px 0 rgba(0, 0, 0, 0.15)
                    `,
                  }}
                >
                  {activeTab}
                </motion.span>
              </AnimatePresence>
            </div>
          )}

          {/* Expanded state - show all sections with stagger */}
          {expanded && (
            <div className="flex items-center justify-evenly w-full gap-2">
              {items.map((item, index) => {
                const isActive = item.name === activeTab

                return (
                  <Link
                    key={item.name}
                    href={item.url}
                    onClick={() => setActiveTab(item.name)}
                  >
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{
                        delay: index * 0.05,
                        duration: 0.25,
                        ease: 'easeOut'
                      }}
                      className="relative cursor-pointer transition-all duration-200"
                      style={{
                        fontSize: isMobile
                          ? (isActive ? '14px' : '13px')
                          : (isActive ? '15.5px' : '15px'),
                        fontWeight: isActive ? 680 : 510,
                        color: isActive ? 'var(--foreground)' : 'var(--muted-foreground)',
                        textDecoration: 'none',
                        letterSpacing: '0.45px',
                        padding: isMobile ? '6px 8px' : '8px 12px',
                        whiteSpace: 'nowrap',
                        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "SF Pro Display", Poppins, sans-serif',
                        WebkitFontSmoothing: 'antialiased',
                        MozOsxFontSmoothing: 'grayscale',
                        transform: isActive ? 'translateY(-1.5px)' : 'translateY(0)',
                        textShadow: isActive
                          ? `
                            0 1px 0 rgba(0, 0, 0, 0.35),
                            0 -1px 0 rgba(255, 255, 255, 0.8),
                            1px 1px 0 rgba(0, 0, 0, 0.18),
                            -1px 1px 0 rgba(0, 0, 0, 0.15)
                          `
                          : `
                            0 1px 0 rgba(0, 0, 0, 0.22),
                            0 -1px 0 rgba(255, 255, 255, 0.65),
                            1px 1px 0 rgba(0, 0, 0, 0.12),
                            -1px 1px 0 rgba(0, 0, 0, 0.10)
                          `,
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.color = 'var(--foreground)'
                          e.currentTarget.style.transform = 'translateY(-0.5px)'
                          e.currentTarget.style.textShadow = `
                            0 1px 0 rgba(0, 0, 0, 0.28),
                            0 -1px 0 rgba(255, 255, 255, 0.72),
                            1px 1px 0 rgba(0, 0, 0, 0.15),
                            -1px 1px 0 rgba(0, 0, 0, 0.12)
                          `
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.color = 'var(--muted-foreground)'
                          e.currentTarget.style.transform = 'translateY(0)'
                          e.currentTarget.style.textShadow = `
                            0 1px 0 rgba(0, 0, 0, 0.22),
                            0 -1px 0 rgba(255, 255, 255, 0.65),
                            1px 1px 0 rgba(0, 0, 0, 0.12),
                            -1px 1px 0 rgba(0, 0, 0, 0.10)
                          `
                        }
                      }}
                    >
                      {item.name}
                    </motion.div>
                  </Link>
                )
              })}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: items.length * 0.05 }}
                className="ml-2"
              >
                <ModeToggle />
              </motion.div>
            </div>
          )}
        </div>
      </motion.nav>
    </div>
  )
}

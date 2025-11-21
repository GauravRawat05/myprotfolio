"use client";

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Hero } from "@/components/ui/animated-hero";
import { User, Briefcase, FileText, Home } from "lucide-react";
import { NavBar } from "@/components/ui/tubelight-navbar";
import { FaqsSection } from "@/components/ui/faqs-1";
import FooterSection from "@/components/ui/footer";
import { TextReveal } from "@/components/ui/text-reveal"
import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/components/ui/scroll-based-velocity"
import { SparklesText } from "@/components/ui/sparkles-text"
import { Particles } from "@/components/ui/particles"
import { FadeIn } from "@/components/ui/fade-in";
import { SkillsSection } from "@/components/ui/skills-section";
import { Timeline } from "@/components/ui/timeline";


const testimonials = [
  {
    quote:
      "MoreTrendz: full‑stack e‑commerce built from scratch with modern tech, secure auth, and responsive UI.",
    name: "MoreTrendz Online",
    designation: "Full‑stack E‑commerce",
    src:
      "/Moretrendz.png",
  },
  {
    quote:
      "Personal Portfolio: interactive Next.js site featuring advanced animations and custom graphics.",
    name: "Portfolio Website",
    designation: "Next.js + Tailwind + Framer Motion",
    src:
      "/p-p.png",
  },
  {
    quote:
      "Code‑Catalyst: contributed as technical team member to a group project, focusing on frontend experiences.",
    name: "Code‑Catalyst Contributions",
    designation: "Team Project",
    src:
      "/Code-Catalyst.png",
  },
];

export function NavBarDemo() {
  const navItems = [
    { name: "Home", url: "#home", icon: Home },
    { name: "Projects", url: "#projects", icon: Briefcase },
    { name: "Skills", url: "#skills", icon: FileText },
    { name: "About", url: "#about", icon: User },
  ];

  return <NavBar items={navItems} />;
}

export function ParticlesDemo() {
  const { theme } = useTheme()
  const [color, setColor] = useState("#ffffff")

  useEffect(() => {
    setColor(theme === "dark" ? "#ffffff" : "#000000")
  }, [theme])

  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
      <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
        Particles
      </span>
      <Particles
        className="absolute inset-0"
        quantity={100}
        ease={80}
        color={color}
        refresh
      />
    </div>
  )
}

export function TimelineDemo() {
  const data = [
    {
      title: "MoreTrendz - An E-commerce Full Stack Web Application",
      content: (
        <div>
          <p className="mb-8 text-base font-normal text-neutral-500 md:text-2xl dark:text-neutral-400">
            Built and launched MoreTrendz from scratch
          </p>
        </div>
      ),
    },
    {
      title: "Portfolio Website - A Next.js Full Stack Web Application",
      content: (
        <div>
          <p className="mb-8 text-base font-normal text-neutral-500 md:text-2xl dark:text-neutral-400">
            Built and launched Portfolio Website from scratch
          </p>
        </div>
      ),
    },
    {
      title: "Code-Catalyst",
      content: (
        <div>
          <p className="mb-4 text-base font-normal text-neutral-500 md:text-2xl lg:text-2xl dark:text-neutral-400">
            Code-Catalyst: Our College's Tech Group. Joined and contributed as technical team member to group projects.
          </p>
        </div>
      ),
    },
  ];
  return (
    <div className="relative w-full overflow-clip">
      <Timeline data={data} />
    </div>
  );
}


export default function Page() {
  return (
    <>
      <header>
        <NavBarDemo />
      </header>

      <main id="home">
        <Hero />
      </main>

      <FadeIn id="projects" className="flex flex-col items-center" style={{ paddingTop: "5vh" }}>
        <SparklesText className="text-center">
          <TextReveal>Here are My Projects</TextReveal>
        </SparklesText>
        <TimelineDemo />
      </FadeIn>

      <FadeIn id="skills" style={{ paddingTop: "10vh" }}>
        <SparklesText className="text-center">
          <TextReveal>Here are My SKILLS</TextReveal>
        </SparklesText>
        <SkillsSection />
      </FadeIn>

      <FadeIn id="about">
        <FaqsSection />
      </FadeIn>

      <FadeIn>
        <ScrollVelocityContainer className="relative w-full text-4xl font-bold md:text-7xl md:py-15" style={{ padding: "10vh 0 10vh 0" }}>
          <ScrollVelocityRow baseVelocity={20} direction={1}>
            . Open to Interships .
          </ScrollVelocityRow>
          <ScrollVelocityRow baseVelocity={20} direction={-1}>
            . Open to Projects .
          </ScrollVelocityRow>
        </ScrollVelocityContainer>
      </FadeIn>

      <FadeIn>
        <FooterSection />
      </FadeIn>
    </>
  );
}
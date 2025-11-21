"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MoveRight, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";

import { SparklesText } from "@/components/ui/sparkles-text"


function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["Full-Stack Developer", "JavaScript", "React & Next.js", "Node.js", "Tailwind CSS"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="w-full">
      <div className="container mx-auto px-4">
        <div className="flex gap-8 pt-32 pb-12 md:pt-40 md:pb-20 lg:pt-52 lg:pb-40 items-center justify-center flex-col">
          <div className="flex gap-4 flex-col">
            <h1 className="text-4xl sm:text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
              <SparklesText> Gaurav Singh Rawat </SparklesText>
              <span className="relative flex w-full justify-center overflow-hidden text-center pt-2 md:pb-0 md:pt-6">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-regular text-primary text-2xl sm:text-3xl md:text-5xl"
                    initial={{ opacity: 0, y: "-100" }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? {
                          y: 0,
                          opacity: 1,
                        }
                        : {
                          y: titleNumber > index ? -150 : 150,
                          opacity: 0,
                        }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>

            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
              Full‑stack web developer (fresher) building modern apps with React, Next.js, Node.js and Tailwind.
              Projects include a full‑stack e‑commerce (moretrendz.online) and this animated portfolio.
              Open to internships and project collaborations.
            </p>
          </div>
          <div className="flex flex-row gap-3">
            {/* <Button size="lg" className="gap-4" variant="outline" asChild>
              <a href="#contact">Contact Me <PhoneCall className="w-4 h-4" /></a>
            </Button> */}

            <Button size="lg" className="gap-4" asChild style={{ zIndex: 1 }}>
              <a href="#projects" rel="noreferrer">View Projects <MoveRight className="w-4 h-4" /></a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Hero };

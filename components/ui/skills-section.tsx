"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code, Database, Wrench } from "lucide-react";

const skillsData = [
    {
        category: "Frontend Development",
        icon: <Code className="w-6 h-6 text-blue-500" />,
        skills: [
            "HTML5",
            "CSS3",
            "JavaScript",
            "Vue.js",
            "Tailwind CSS",
            "Responsive Design",
        ],
    },
    {
        category: "Backend Development",
        icon: <Database className="w-6 h-6 text-green-500" />,
        skills: [
            "Node.js",
            "Next.js",
            "React",
            "Express",
            "SQL",
            "MongoDB",
            "TypeScript",
        ],
    },
    {
        category: "Tools & Workflow",
        icon: <Wrench className="w-6 h-6 text-purple-500" />,
        skills: [
            "Excel",
            "Basic Python",
            "Git & GitHub",
            "Vercel",
            "Render",
            "Netlify",
            "AI Agentic Workflow (Cursor, Antigravity, Warp etc)",
        ],
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring" as const,
            stiffness: 100,
        },
    },
};

export function SkillsSection() {
    return (
        <section className="w-full py-12 px-4 md:px-6">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {skillsData.map((category, index) => (
                        <motion.div
                            key={index}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            variants={containerVariants}
                            className="flex flex-col gap-4 p-6 rounded-2xl bg-white/5 dark:bg-black/5 border border-white/10 dark:border-white/5 backdrop-blur-sm hover:border-white/20 transition-colors duration-300"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 rounded-lg bg-white/10 dark:bg-white/5">
                                    {category.icon}
                                </div>
                                <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
                                    {category.category}
                                </h3>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {category.skills.map((skill, skillIndex) => (
                                    <motion.span
                                        key={skillIndex}
                                        variants={itemVariants}
                                        whileHover={{ scale: 1.05 }}
                                        className="px-3 py-1.5 text-sm font-medium rounded-full bg-white/50 dark:bg-white/10 border border-gray-200 dark:border-white/10 text-gray-800 dark:text-gray-200 hover:bg-white dark:hover:bg-white/20 hover:shadow-sm transition-all cursor-default"
                                    >
                                        {skill}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

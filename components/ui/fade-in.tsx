"use client";

import { motion, HTMLMotionProps } from "framer-motion";

export function FadeIn({
    children,
    delay = 0,
    className,
    ...props
}: {
    children: React.ReactNode;
    delay?: number;
    className?: string;
} & HTMLMotionProps<"div">) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay, ease: "easeOut" }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
}

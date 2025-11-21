import React from 'react';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { TextReveal } from "@/components/ui/text-reveal"
import { SparklesText } from "@/components/ui/sparkles-text"

export function FaqsSection() {
	return (
		<div className="mx-auto w-full max-w-3xl space-y-7 px-4 pt-16">
			<div className="space-y-2" id="about">
				<SparklesText className="text-center">
					<TextReveal>About Me</TextReveal>
				</SparklesText>
				{/* <h2 className="text-3xl font-bold md:text-4xl">About Me</h2> */}
				<p className="text-muted-foreground max-w-2xl">
					I’m Gaurav Singh Rawat, a fresher full‑stack web developer. I build modern apps with React,
					Next.js, Node.js and Tailwind CSS. Here are answers to common questions.
				</p>
			</div>
			<Accordion
				type="single"
				collapsible
				className="bg-card dark:bg-card/50 w-full -space-y-px rounded-lg "
				defaultValue="item-1"
			>
				{questions.map((item) => (
					<AccordionItem
						value={item.id}
						key={item.id}
						className="relative border-x first:rounded-t-lg first:border-t last:rounded-b-lg last:border-b"
					>
						<AccordionTrigger className="px-4 py-4 text-[15px] leading-6 hover:no-underline">
							{item.title}
						</AccordionTrigger>
						<AccordionContent className="text-muted-foreground pb-4 px-4">
							{item.content}
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</div>
	);
}

const questions = [
	{ id: 'item-1', title: 'Who am I?', content: 'I’m Gaurav Singh Rawat — fresher full‑stack developer focused on JavaScript, React, Next.js, Node.js and Tailwind CSS.' },
	{ id: 'item-2', title: 'What have I built?', content: 'MoreTrendz (full‑stack e‑commerce from scratch), this animated portfolio, and team contributions at Code‑Catalyst.' },
	{ id: 'item-3', title: 'What’s my stack?', content: 'React, Next.js, Node.js, Tailwind CSS, Framer Motion and Three.js (drei/fiber) for graphics.' },
	{ id: 'item-4', title: 'Am I available?', content: 'Yes — open to internships and project collaborations.' },
	{ id: 'item-5', title: 'How can you contact me?', content: 'Email: itsgauravrawat2005@gmail.com · Phone: +91 93198 10682 · LinkedIn: /in/gauravsinghrawat1310/ · GitHub: GauravRawat05.' },
];

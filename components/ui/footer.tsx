import Link from 'next/link'

// Import generic icons from lucide-react
import { Github, Linkedin, Mail, Phone } from 'lucide-react'

const links = [
    { title: 'About', href: '#about' },
    { title: 'Projects', href: '#projects' },
    { title: 'Contact', href: '#contact' },
    { title: 'Home', href: '#home' },
]

export default function FooterSection() {
    return (
        <footer className="md:pt-0 md:pb-32" style={{ padding: "0vh 0 10vh 0" }}>
            <div className="mx-auto max-w-5xl px-6">
                <Link
                    href="/"
                    aria-label="go home"
                    className="mx-auto block size-fit">
                </Link>

                <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
                    {links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.href}
                            className="text-muted-foreground hover:text-primary block duration-150">
                            <span>{link.title}</span>
                        </Link>
                    ))}
                </div>
                <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
                    <Link href="https://github.com/GauravRawat05" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-muted-foreground hover:text-primary block">
                        <Github className="size-6" />
                    </Link>
                    <Link href="https://www.linkedin.com/in/gauravsinghrawat1310/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary block">
                        <Linkedin className="size-6" />
                    </Link>
                    <Link href="mailto:itsgauravrawat2005@gmail.com" aria-label="Email" className="text-muted-foreground hover:text-primary block">
                        <Mail className="size-6" />
                    </Link>
                    <Link href="tel:+919319810682" aria-label="Phone" className="text-muted-foreground hover:text-primary block">
                        <Phone className="size-6" />
                    </Link>
                </div>
                <span className="text-muted-foreground block text-center text-sm"> © {new Date().getFullYear()} Gaurav Singh Rawat. All rights reserved.</span>
            </div>
        </footer>
    )
}
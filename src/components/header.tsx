import { SOCIAL_LINKS } from "@/lib/data";
import { Github, Linkedin, Mail, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-6xl items-center">
        <div className="mr-4 flex">
          <a href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold font-headline sm:inline-block">
              Personal Canvas
            </span>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center space-x-1">
            <Button variant="ghost" size="icon" asChild>
              <a href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                <Github />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <Linkedin />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href={SOCIAL_LINKS.email} aria-label="Email">
                <Mail />
              </a>
            </Button>
          </nav>
          <div className="hidden md:block">
            <Button asChild>
              <a href="/resume.pdf" download="resume.pdf">
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

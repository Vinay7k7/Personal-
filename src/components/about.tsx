import { SKILLS } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

export function About() {
  return (
    <section id="about" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              I Craft Digital Experiences
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              As a dedicated developer and designer, I specialize in building accessible, high-quality web applications. My passion lies in creating elegant solutions to complex problems, always with a focus on user experience and performance.
            </p>
          </div>
          <div className="flex flex-col items-start space-y-4">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">My Skills</h2>
            <div className="flex flex-wrap gap-2">
              {SKILLS.map((skill) => (
                <Badge key={skill} variant="secondary" className="px-3 py-1 text-sm">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

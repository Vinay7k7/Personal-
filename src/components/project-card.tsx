'use client';

import * as React from 'react';
import Image from 'next/image';
import type { Project } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github, Sparkles } from 'lucide-react';
import { AiToolsDialog } from './ai-tools-dialog';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [isAiDialogOpen, setIsAiDialogOpen] = React.useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      cardRef.current.style.setProperty('--mouse-x', `${x}px`);
      cardRef.current.style.setProperty('--mouse-y', `${y}px`);
    }
  };

  return (
    <>
      <Card 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className="group relative flex h-full transform flex-col overflow-hidden rounded-lg border-2 border-border bg-card shadow-lg transition-transform duration-300 hover:scale-105"
      >
        <div className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" 
             style={{
                background: 'radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), hsl(var(--primary) / 0.4), transparent 40%)',
             }}
        />
        <CardHeader>
          <div className="aspect-video overflow-hidden rounded-md">
            <Image
              src={project.imageUrl}
              alt={project.title}
              width={600}
              height={400}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              data-ai-hint={project.imageHint}
            />
          </div>
        </CardHeader>
        <CardContent className="flex-grow space-y-4">
          <CardTitle className="font-headline text-2xl">{project.title}</CardTitle>
          <CardDescription>{project.description}</CardDescription>
          <div className="flex flex-wrap gap-2">
            {project.skills.slice(0, 4).map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex-col items-start gap-4">
          <div className="flex w-full justify-between">
            <div className="flex gap-2">
              {project.githubUrl && (
                <Button variant="outline" size="icon" asChild>
                  <a href={project.githubUrl} target="_blank" rel="noreferrer" aria-label="GitHub repository">
                    <Github className="h-4 w-4" />
                  </a>
                </Button>
              )}
              {project.projectUrl && (
                <Button variant="outline" size="icon" asChild>
                  <a href={project.projectUrl} target="_blank" rel="noreferrer" aria-label="Live project">
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              )}
            </div>
            <Button variant="ghost" className="text-accent-foreground/80 hover:text-accent-foreground" onClick={() => setIsAiDialogOpen(true)}>
              <Sparkles className="mr-2 h-4 w-4" />
              Enhance with AI
            </Button>
          </div>
        </CardFooter>
      </Card>
      <AiToolsDialog project={project} open={isAiDialogOpen} onOpenChange={setIsAiDialogOpen} />
    </>
  );
}

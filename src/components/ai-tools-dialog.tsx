'use client';

import * as React from 'react';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import type { Project } from '@/lib/types';
import {
  generateProjectDescription,
  GenerateProjectDescriptionInput,
  GenerateProjectDescriptionOutput,
} from '@/ai/flows/generate-project-description';
import {
  suggestProjectKeywords,
  SuggestProjectKeywordsInput,
  SuggestProjectKeywordsOutput,
} from '@/ai/flows/suggest-project-keywords';
import {
  optimizeDescriptionTone,
  OptimizeDescriptionToneInput,
  OptimizeDescriptionToneOutput,
} from '@/ai/flows/optimize-description-tone';

import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Sparkles, Clipboard } from 'lucide-react';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';

interface AiToolsDialogProps {
  project: Project;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const GenerateDescriptionSchema = z.object({
  projectName: z.string().min(1, 'Project name is required.'),
  projectDescription: z.string().min(1, 'Project description is required.'),
  skillsUsed: z.string().min(1, 'Skills are required.'),
  achievements: z.string().min(1, 'Achievements are required.'),
});

const SuggestKeywordsSchema = z.object({
  projectName: z.string().min(1, 'Project name is required.'),
  projectDescription: z.string().min(1, 'Project description is required.'),
});

const OptimizeToneSchema = z.object({
  description: z.string().min(1, 'Description is required.'),
});

function CopyButton({ text }: { text: string }) {
    const { toast } = useToast();
    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={() => {
                navigator.clipboard.writeText(text);
                toast({ title: 'Copied to clipboard!' });
            }}
        >
            <Clipboard className="h-4 w-4" />
        </Button>
    );
}

function GenerateDescriptionForm({ project }: { project: Project }) {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = React.useState<GenerateProjectDescriptionOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof GenerateDescriptionSchema>>({
    resolver: zodResolver(GenerateDescriptionSchema),
    defaultValues: {
      projectName: project.title,
      projectDescription: project.description,
      skillsUsed: project.skills.join(', '),
      achievements: project.achievements.join(', '),
    },
  });

  const onSubmit = (values: z.infer<typeof GenerateDescriptionSchema>) => {
    startTransition(async () => {
      const res = await generateProjectDescription(values);
      if (res) {
        setResult(res);
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to generate description.',
        });
      }
    });
  };

  return (
    <div className="space-y-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Form fields here */}
          <FormField control={form.control} name="projectName" render={({ field }) => (
            <FormItem><FormLabel>Project Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="projectDescription" render={({ field }) => (
            <FormItem><FormLabel>Brief Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="skillsUsed" render={({ field }) => (
            <FormItem><FormLabel>Skills Used (comma-separated)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
          )} />
           <FormField control={form.control} name="achievements" render={({ field }) => (
            <FormItem><FormLabel>Achievements (comma-separated)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <Button type="submit" disabled={isPending}>
            {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
            Generate
          </Button>
        </form>
      </Form>
      {result && (
        <Card>
            <CardContent className="p-4">
                <div className="flex justify-between items-start">
                    <p className="text-sm text-muted-foreground flex-grow pr-4">{result.generatedDescription}</p>
                    <CopyButton text={result.generatedDescription} />
                </div>
            </CardContent>
        </Card>
      )}
    </div>
  );
}

function SuggestKeywordsForm({ project }: { project: Project }) {
    const [isPending, startTransition] = useTransition();
    const [result, setResult] = React.useState<SuggestProjectKeywordsOutput | null>(null);
    const { toast } = useToast();

    const form = useForm<z.infer<typeof SuggestKeywordsSchema>>({
        resolver: zodResolver(SuggestKeywordsSchema),
        defaultValues: {
            projectName: project.title,
            projectDescription: project.longDescription,
        },
    });

    const onSubmit = (values: z.infer<typeof SuggestKeywordsSchema>) => {
        startTransition(async () => {
            const res = await suggestProjectKeywords(values);
            if (res) {
                setResult(res);
            } else {
                toast({ variant: 'destructive', title: 'Error', description: 'Failed to suggest keywords.' });
            }
        });
    };

    return (
        <div className="space-y-4">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField control={form.control} name="projectName" render={({ field }) => (
                        <FormItem><FormLabel>Project Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="projectDescription" render={({ field }) => (
                        <FormItem><FormLabel>Project Description</FormLabel><FormControl><Textarea {...field} rows={6} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <Button type="submit" disabled={isPending}>
                        {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                        Suggest
                    </Button>
                </form>
            </Form>
            {result && (
                <div className="space-y-4">
                    <Card>
                        <CardContent className="p-4 space-y-2">
                             <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="font-semibold mb-2">Improved Description</h4>
                                    <p className="text-sm text-muted-foreground">{result.improvedDescription}</p>
                                </div>
                                <CopyButton text={result.improvedDescription} />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4 space-y-2">
                             <h4 className="font-semibold mb-2">Suggested Keywords</h4>
                            <div className="flex flex-wrap gap-2">
                                {result.keywords.map(kw => <Badge key={kw} variant="secondary">{kw}</Badge>)}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}

function OptimizeToneForm({ project }: { project: Project }) {
    const [isPending, startTransition] = useTransition();
    const [result, setResult] = React.useState<OptimizeDescriptionToneOutput | null>(null);
    const { toast } = useToast();

    const form = useForm<z.infer<typeof OptimizeToneSchema>>({
        resolver: zodResolver(OptimizeToneSchema),
        defaultValues: { description: project.longDescription },
    });

    const onSubmit = (values: z.infer<typeof OptimizeToneSchema>) => {
        startTransition(async () => {
            const res = await optimizeDescriptionTone(values);
            if (res) {
                setResult(res);
            } else {
                toast({ variant: 'destructive', title: 'Error', description: 'Failed to optimize tone.' });
            }
        });
    };

    return (
        <div className="space-y-4">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                     <FormField control={form.control} name="description" render={({ field }) => (
                        <FormItem><FormLabel>Project Description</FormLabel><FormControl><Textarea {...field} rows={6}/></FormControl><FormMessage /></FormItem>
                    )} />
                    <Button type="submit" disabled={isPending}>
                        {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                        Optimize
                    </Button>
                </form>
            </Form>
             {result && (
                <div className="space-y-4">
                     <Card>
                        <CardContent className="p-4 space-y-2">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="font-semibold mb-2">Optimized Description</h4>
                                    <p className="text-sm text-muted-foreground">{result.optimizedDescription}</p>
                                </div>
                                <CopyButton text={result.optimizedDescription} />
                            </div>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardContent className="p-4 space-y-2">
                            <h4 className="font-semibold mb-2">Keywords</h4>
                            <p className="text-sm text-muted-foreground">{result.keywords}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4 space-y-2">
                            <h4 className="font-semibold mb-2">Tone Analysis</h4>
                            <p className="text-sm text-muted-foreground">{result.toneAnalysis}</p>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}


export function AiToolsDialog({ project, open, onOpenChange }: AiToolsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle className="font-headline">Enhance with AI</DialogTitle>
          <DialogDescription>
            Use AI to improve your project's presentation.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="generate" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="generate">Generate</TabsTrigger>
            <TabsTrigger value="suggest">Suggest</TabsTrigger>
            <TabsTrigger value="optimize">Optimize</TabsTrigger>
          </TabsList>
          <TabsContent value="generate" className="pt-4">
            <GenerateDescriptionForm project={project} />
          </TabsContent>
          <TabsContent value="suggest" className="pt-4">
            <SuggestKeywordsForm project={project} />
          </TabsContent>
          <TabsContent value="optimize" className="pt-4">
            <OptimizeToneForm project={project} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

'use server';

/**
 * @fileOverview Generates compelling project descriptions using AI, highlighting key skills and achievements.
 *
 * - generateProjectDescription - A function that generates a project description.
 * - GenerateProjectDescriptionInput - The input type for the generateProjectDescription function.
 * - GenerateProjectDescriptionOutput - The return type for the generateProjectDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProjectDescriptionInputSchema = z.object({
  projectName: z.string().describe('The name of the project.'),
  projectDescription: z.string().describe('A brief description of the project.'),
  skillsUsed: z.string().describe('A list of skills used in the project, separated by commas.'),
  achievements: z.string().describe('A list of achievements in the project, separated by commas.'),
});
export type GenerateProjectDescriptionInput = z.infer<typeof GenerateProjectDescriptionInputSchema>;

const GenerateProjectDescriptionOutputSchema = z.object({
  generatedDescription: z.string().describe('The AI-generated project description.'),
});
export type GenerateProjectDescriptionOutput = z.infer<typeof GenerateProjectDescriptionOutputSchema>;

export async function generateProjectDescription(
  input: GenerateProjectDescriptionInput
): Promise<GenerateProjectDescriptionOutput> {
  return generateProjectDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProjectDescriptionPrompt',
  input: {schema: GenerateProjectDescriptionInputSchema},
  output: {schema: GenerateProjectDescriptionOutputSchema},
  prompt: `You are an AI assistant helping users create compelling project descriptions for their portfolios.

  Based on the project's details, create a project description that is engaging, highlights key skills, and showcases the project's achievements.

  Project Name: {{{projectName}}}
  Brief Project Description: {{{projectDescription}}}
  Skills Used: {{{skillsUsed}}}
  Achievements: {{{achievements}}}

  Write a description that is approximately 150-200 words long.
  `,
});

const generateProjectDescriptionFlow = ai.defineFlow(
  {
    name: 'generateProjectDescriptionFlow',
    inputSchema: GenerateProjectDescriptionInputSchema,
    outputSchema: GenerateProjectDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

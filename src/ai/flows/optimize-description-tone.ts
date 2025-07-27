'use server';

/**
 * @fileOverview Optimizes the tone of project descriptions using AI.
 *
 * - optimizeDescriptionTone - A function that optimizes the tone of a project description.
 * - OptimizeDescriptionToneInput - The input type for the optimizeDescriptionTone function.
 * - OptimizeDescriptionToneOutput - The return type for the optimizeDescriptionTone function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OptimizeDescriptionToneInputSchema = z.object({
  description: z
    .string()
    .describe('The original project description to be optimized.'),
});
export type OptimizeDescriptionToneInput = z.infer<
  typeof OptimizeDescriptionToneInputSchema
>;

const OptimizeDescriptionToneOutputSchema = z.object({
  optimizedDescription: z
    .string()
    .describe('The AI-optimized project description.'),
  keywords: z
    .string()
    .describe('Relevant keywords extracted from the description.'),
  toneAnalysis: z
    .string()
    .describe('An analysis of the original and optimized tone.'),
});
export type OptimizeDescriptionToneOutput = z.infer<
  typeof OptimizeDescriptionToneOutputSchema
>;

export async function optimizeDescriptionTone(
  input: OptimizeDescriptionToneInput
): Promise<OptimizeDescriptionToneOutput> {
  return optimizeDescriptionToneFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimizeDescriptionTonePrompt',
  input: {schema: OptimizeDescriptionToneInputSchema},
  output: {schema: OptimizeDescriptionToneOutputSchema},
  prompt: `You are an AI assistant designed to optimize project descriptions for professional portfolios.  You will be given a project description, and you will return an optimized version of the description, a list of keywords, and an analysis of the original and optimized tone.

Project Description: {{{description}}}

Optimize the description to be more engaging and highlight relevant skills.  Extract keywords that would be relevant for someone searching for this project or the skills demonstrated in it.  Analyze the tone of the original description and the optimized description.

Output in JSON format.
`,
});

const optimizeDescriptionToneFlow = ai.defineFlow(
  {
    name: 'optimizeDescriptionToneFlow',
    inputSchema: OptimizeDescriptionToneInputSchema,
    outputSchema: OptimizeDescriptionToneOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

'use server';

/**
 * @fileOverview This file contains a Genkit flow for suggesting relevant keywords for project descriptions.
 *
 * The flow uses AI to generate personalized descriptions for each project and highlight relevant skills,
 * acting as a tool to suggest improved language, keywords, and tone.
 *
 * @exports {
 *   suggestProjectKeywords,
 *   SuggestProjectKeywordsInput,
 *   SuggestProjectKeywordsOutput
 * }
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestProjectKeywordsInputSchema = z.object({
  projectDescription: z
    .string()
    .describe('The current description of the project.'),
  projectName: z.string().describe('The name of the project.'),
});

export type SuggestProjectKeywordsInput = z.infer<
  typeof SuggestProjectKeywordsInputSchema
>;

const SuggestProjectKeywordsOutputSchema = z.object({
  keywords: z
    .array(z.string())
    .describe('An array of suggested keywords for the project description.'),
  improvedDescription: z
    .string()
    .describe('An improved version of the project description.'),
});

export type SuggestProjectKeywordsOutput = z.infer<
  typeof SuggestProjectKeywordsOutputSchema
>;

export async function suggestProjectKeywords(
  input: SuggestProjectKeywordsInput
): Promise<SuggestProjectKeywordsOutput> {
  return suggestProjectKeywordsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestProjectKeywordsPrompt',
  input: {schema: SuggestProjectKeywordsInputSchema},
  output: {schema: SuggestProjectKeywordsOutputSchema},
  prompt: `You are an AI assistant designed to improve project descriptions and suggest relevant keywords for better visibility and SEO.

  Project Name: {{{projectName}}}

  Current Project Description: {{{projectDescription}}}

  Instructions:
  1. Analyze the current project description provided.
  2. Identify the core technologies, skills, and concepts demonstrated in the project.
  3. Suggest an improved description that highlights these aspects more effectively.
  4. Generate an array of keywords that are relevant to the project, which will improve its visibility and SEO.

  Output the suggested keywords and improved description in the following JSON format:
  {{$response}}
  `,
});

const suggestProjectKeywordsFlow = ai.defineFlow(
  {
    name: 'suggestProjectKeywordsFlow',
    inputSchema: SuggestProjectKeywordsInputSchema,
    outputSchema: SuggestProjectKeywordsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

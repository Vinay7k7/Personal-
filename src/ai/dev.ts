import { config } from 'dotenv';
config();

import '@/ai/flows/suggest-project-keywords.ts';
import '@/ai/flows/optimize-description-tone.ts';
import '@/ai/flows/generate-project-description.ts';
export type Project = {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  imageUrl: string;
  imageHint: string;
  projectUrl?: string;
  githubUrl?: string;
  skills: string[];
  achievements: string[];
};

import type { Project } from '@/lib/types';

export const SKILLS = [
  "React", "Next.js", "TypeScript", "JavaScript", "Node.js", "GraphQL", 
  "PostgreSQL", "Tailwind CSS", "Figma", "Firebase", "Genkit AI"
];

export const SOCIAL_LINKS = {
  github: "https://github.com",
  linkedin: "https://linkedin.com/in",
  email: "mailto:hello@example.com",
};

export const PROJECTS: Project[] = [
  {
    id: 'project-1',
    title: 'E-commerce Platform',
    description: 'A full-stack e-commerce website with a modern, clean design.',
    longDescription: 'Developed a feature-rich e-commerce platform using Next.js for the frontend and Node.js for the backend. Integrated Stripe for secure payments and implemented a custom CMS for managing products. The user interface is fully responsive, providing an optimal shopping experience on all devices.',
    imageUrl: 'https://placehold.co/1200x800.png',
    imageHint: 'online store',
    projectUrl: '#',
    githubUrl: '#',
    skills: ['Next.js', 'React', 'Node.js', 'Stripe', 'Tailwind CSS'],
    achievements: ['Processed over 1,000 transactions in the first month', 'Achieved a 95+ score on Google PageSpeed Insights', 'Reduced bounce rate by 30% through UI/UX improvements'],
  },
  {
    id: 'project-2',
    title: 'AI-Powered Task Manager',
    description: 'A smart task management app that helps you prioritize your work.',
    longDescription: 'This application leverages Genkit AI to provide smart suggestions and automate task organization. Built with React and Firebase, it offers real-time collaboration features, customizable workflows, and a beautiful, intuitive interface. The AI helps users break down large tasks and estimate completion times.',
    imageUrl: 'https://placehold.co/1200x800.png',
    imageHint: 'task manager',
    projectUrl: '#',
    githubUrl: '#',
    skills: ['React', 'Firebase', 'Genkit AI', 'TypeScript', 'Figma'],
    achievements: ['Increased user productivity by an average of 25%', 'Featured on a popular tech blog for its innovative use of AI', 'Grew to 10,000 active users within three months'],
  },
  {
    id: 'project-3',
    title: 'Data Visualization Dashboard',
    description: 'A dashboard for visualizing complex datasets with interactive charts.',
    longDescription: 'Created a powerful data visualization tool using D3.js and React. The dashboard allows users to upload their own datasets, generate various types of interactive charts and graphs, and export their visualizations. It is designed to handle large volumes of data efficiently, providing a smooth and responsive user experience.',
    imageUrl: 'https://placehold.co/1200x800.png',
    imageHint: 'data dashboard',
    projectUrl: '#',
    githubUrl: '#',
    skills: ['React', 'D3.js', 'JavaScript', 'Data Visualization'],
    achievements: ['Adopted by a financial services company for internal data analysis', 'Praised for its intuitive interface and powerful features', 'Successfully visualized datasets with over 1 million data points'],
  },
];

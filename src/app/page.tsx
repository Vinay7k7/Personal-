import { About } from '@/components/about';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Projects } from '@/components/projects';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="container mx-auto max-w-6xl flex-grow px-4 py-8 md:py-16">
        <About />
        <Projects />
      </main>
      <Footer />
    </div>
  );
}

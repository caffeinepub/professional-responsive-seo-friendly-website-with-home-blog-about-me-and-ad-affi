import { Link } from '@tanstack/react-router';
import { WelcomeSection } from '../components/home/WelcomeSection';
import { Seo } from '../components/seo/Seo';
import { Users } from 'lucide-react';

export default function HomePage() {
  return (
    <>
      <Seo
        title="Home"
        description="Welcome to MHS Habibur Blog - Discover insights on online income strategies, digital marketing tactics, and expertise to help you succeed in the digital economy."
        path="/"
      />
      <WelcomeSection />
      
      <section className="container py-12 md:py-16">
        <div className="glass-background mx-auto max-w-2xl rounded-2xl p-8 md:p-12 text-center">
          <div className="mb-6 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 backdrop-blur-sm">
              <Users className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h2 className="neon-heading mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Join My Team
          </h2>
          <p className="mb-8 text-lg text-white/90 md:text-xl">
            Start your journey with us today. Complete tasks, earn rewards, and grow together as a team.
          </p>
          <Link
            to="/tasks/task-1"
            className="neon-button neon-button-primary inline-flex h-12 items-center justify-center rounded-md px-8 text-base font-semibold shadow-lg transition-all hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Join My Team
          </Link>
        </div>
      </section>
    </>
  );
}

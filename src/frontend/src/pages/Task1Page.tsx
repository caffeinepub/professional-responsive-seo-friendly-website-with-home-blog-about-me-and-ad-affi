import { Link } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';
import { Seo } from '../components/seo/Seo';
import { TaskInteractionCard } from '../components/tasks/TaskInteractionCard';
import { TaskHowToCompleteSection } from '../components/tasks/TaskHowToCompleteSection';
import { ApprovalGuard } from '../components/tasks/ApprovalGuard';

export default function Task1Page() {
  return (
    <>
      <Seo
        title="Task 1"
        description="Complete Task 1 to earn rewards. Follow the instructions and submit your secret code."
        path="/tasks/task-1"
      />
      <ApprovalGuard>
        <section className="container py-12 md:py-16">
          <h1 className="neon-heading mb-8 text-center text-3xl font-bold tracking-tight md:text-4xl">
            Task 1
          </h1>
          <TaskHowToCompleteSection />
          <TaskInteractionCard taskUrl="https://shrinkme.click/1BpQ6Y" />
          
          {/* Back to Home Button */}
          <div className="mt-8 flex justify-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-background/80 px-4 py-2 text-sm font-medium text-foreground/80 backdrop-blur-sm transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </div>
        </section>
      </ApprovalGuard>
    </>
  );
}

import { Seo } from '../components/seo/Seo';
import { TaskInteractionCard } from '../components/tasks/TaskInteractionCard';

export default function Task3Page() {
  return (
    <>
      <Seo
        title="Task 3"
        description="Complete Task 3 to earn rewards. Follow the instructions and submit your secret code."
        path="/tasks/task-3"
      />
      <section className="container py-12 md:py-16">
        <h1 className="neon-heading mb-8 text-center text-3xl font-bold tracking-tight md:text-4xl">
          Task 3
        </h1>
        <TaskInteractionCard taskUrl="https://shrinkme.click/LyCUCQ" />
      </section>
    </>
  );
}

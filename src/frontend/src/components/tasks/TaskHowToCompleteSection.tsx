export function TaskHowToCompleteSection() {
  return (
    <div className="glass-background mx-auto mb-8 max-w-2xl rounded-xl p-6 md:p-8">
      <h2 className="mb-4 text-xl font-semibold text-white md:text-2xl">
        How to Complete This Task
      </h2>
      <ul className="space-y-3 text-cyan-300">
        <li className="flex items-start gap-3">
          <span className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-sm font-semibold">
            1
          </span>
          <span className="text-base md:text-lg">Start work by clicking the "Start Work" button</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-sm font-semibold">
            2
          </span>
          <span className="text-base md:text-lg">Find the secret code on the task page</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-sm font-semibold">
            3
          </span>
          <span className="text-base md:text-lg">Paste the code in the input field below</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-sm font-semibold">
            4
          </span>
          <span className="text-base md:text-lg">Submit your code to complete the task</span>
        </li>
      </ul>
    </div>
  );
}

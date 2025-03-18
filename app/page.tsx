// app/page.tsx
'use client';

import TaskForm from '@/Components/TaskForm';
import TaskList from '@/Components/TaskList';
import TaskFilter from '@/Components/TaskFilter';
import UndoToast from '@/Components/UndoToast';

export default function Home() {
  return (
    <main className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold text-center my-4">Task Manager</h1>
      
      <TaskForm />
      <TaskFilter />
      <TaskList />
      <UndoToast />
    </main>
  );
}
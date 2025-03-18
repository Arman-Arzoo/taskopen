// components/TaskForm.tsx
import React, { useState } from 'react';
import { useTaskStore } from '../store/useTaskStore';

export default function TaskForm() {
  const [title, setTitle] = useState('');
  const addTask = useTaskStore(state => state.addTask);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      addTask(title.trim());
      setTitle('');
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="flex space-x-2">
      <input
        type="text"
        value={title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
        placeholder="Add a new task..."
        className="flex-grow border rounded px-3 py-2"
      />
      <button 
        type="submit" 
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add
      </button>
    </form>
  );
}
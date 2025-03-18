// components/TaskList.tsx
import React from 'react';
import { useTaskStore } from '../store/useTaskStore';
import { motion, AnimatePresence } from 'framer-motion';
import { XCircle } from 'lucide-react';

export default function TaskList() {
  const { tasks, filter, toggleTask, deleteTask } = useTaskStore();
  
  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });
  
  return (
    <div className="space-y-2 mt-4">
      <AnimatePresence>
        {filteredTasks.map((task) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-between p-3 bg-white dark:bg-slate-800 rounded-md shadow-sm"
          >
            <div className="flex items-center space-x-3">
              <input 
                type="checkbox"
                id={`task-${task.id}`}
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="h-4 w-4"
              />
              <label 
                htmlFor={`task-${task.id}`}
                className={`text-sm ${task.completed ? 'line-through text-gray-500' : ''}`}
              >
                {task.title}
              </label>
            </div>
            
            <button
              onClick={() => deleteTask(task.id)}
              className="h-8 w-8 text-gray-500 hover:text-red-500 bg-transparent border-none"
              aria-label="Delete task"
            >
              <XCircle size={16} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
      
      {filteredTasks.length === 0 && (
        <p className="text-center text-gray-500 py-4">No tasks found</p>
      )}
    </div>
  );
}
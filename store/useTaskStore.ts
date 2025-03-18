// store/useTaskStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Task, FilterType } from '../types';

interface TaskState {
  tasks: Task[];
  filter: FilterType;
  recentlyDeleted: Task | null;
  
  // Actions
  addTask: (title: string) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  undoDelete: () => void;
  setFilter: (filter: FilterType) => void;
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set) => ({
      tasks: [],
      filter: 'all',
      recentlyDeleted: null,
      
      addTask: (title) => set((state) => ({
        tasks: [...state.tasks, {
          id: Date.now().toString(),
          title,
          completed: false
        }]
      })),
      
      toggleTask: (id) => set((state) => ({
        tasks: state.tasks.map(task => 
          task.id === id ? { ...task, completed: !task.completed } : task
        )
      })),
      
      deleteTask: (id) => set((state) => {
        const taskToDelete = state.tasks.find(task => task.id === id) || null;
        return {
          tasks: state.tasks.filter(task => task.id !== id),
          recentlyDeleted: taskToDelete
        };
      }),
      
      undoDelete: () => set((state) => {
        if (!state.recentlyDeleted) return state;
        return {
          tasks: [...state.tasks, state.recentlyDeleted],
          recentlyDeleted: null
        };
      }),
      
      setFilter: (filter) => set({ filter }),
    }),
    {
      name: 'task-storage',
    }
  )
);
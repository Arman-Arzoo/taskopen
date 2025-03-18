// components/TaskFilter.tsx
import React from 'react';
import { useTaskStore } from '../store/useTaskStore';
import { FilterType } from '../types';

export default function TaskFilter() {
  const { filter, setFilter } = useTaskStore();
  
  const filters: FilterType[] = ['all', 'completed', 'pending'];
  
  return (
    <div className="flex justify-center space-x-2 my-4">
      {filters.map((filterType) => (
        <button
          key={filterType}
          onClick={() => setFilter(filterType)}
          className={`px-3 py-1 text-sm rounded capitalize ${
            filter === filterType 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          {filterType}
        </button>
      ))}
    </div>
  );
}
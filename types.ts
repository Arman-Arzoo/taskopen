// types.ts
export interface Task {
    id: string;
    title: string;
    completed: boolean;
  }
  
  export type FilterType = 'all' | 'completed' | 'pending';
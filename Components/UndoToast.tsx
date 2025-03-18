// components/UndoToast.tsx
import React, { useEffect, useState } from 'react';
import { useTaskStore } from '../store/useTaskStore';
import { motion, AnimatePresence } from 'framer-motion';

export default function UndoToast() {
  const { recentlyDeleted, undoDelete } = useTaskStore();
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    if (recentlyDeleted) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [recentlyDeleted]);
  
  const handleUndo = () => {
    undoDelete();
    setVisible(false);
  };
  
  return (
    <AnimatePresence>
      {visible && recentlyDeleted && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 right-4 bg-gray-800 text-white p-4 rounded-md shadow-lg flex items-center space-x-4"
        >
          <div>
            <p>Task deleted: {recentlyDeleted.title}</p>
          </div>
          <button 
            onClick={handleUndo} 
            className="bg-white text-gray-800 px-3 py-1 text-sm rounded hover:bg-gray-200"
          >
            Undo
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
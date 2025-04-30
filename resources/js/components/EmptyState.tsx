import React from 'react';
import { motion } from 'framer-motion';
import { ClipboardCheck } from 'lucide-react';

interface EmptyStateProps {
  onAddSampleTasks: () => void;
}

export function EmptyState({ onAddSampleTasks }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mt-12 flex flex-col items-center justify-center text-center py-12 px-6
                bg-gray-50 border border-gray-200 border-dashed rounded-lg"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20
        }}
        className="w-16 h-16 mb-6 flex items-center justify-center bg-blue-100 
                  text-blue-500 rounded-full"
      >
        <ClipboardCheck size={32} />
      </motion.div>
      
      <h3 className="text-xl font-medium text-gray-900 mb-2">No tasks yet</h3>
      <p className="text-gray-600 max-w-md mb-6">
        Start by adding your first task or add some sample tasks to see how it works
      </p>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onAddSampleTasks}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-sm
                hover:bg-blue-600 transition-colors"
      >
        Add Sample Tasks
      </motion.button>
    </motion.div>
  );
}
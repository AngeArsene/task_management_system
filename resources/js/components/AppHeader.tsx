import React from 'react';
import { ClipboardList } from 'lucide-react';
import { motion } from 'framer-motion';

export function AppHeader() {
  return (
    <motion.header 
      className="mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center">
        <motion.div 
          className="mr-3 text-blue-500"
          whileHover={{ rotate: 5, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <ClipboardList size={32} />
        </motion.div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">TaskFlow</h1>
          <p className="text-sm text-gray-600">Manage your tasks with ease</p>
        </div>
      </div>
    </motion.header>
  );
}
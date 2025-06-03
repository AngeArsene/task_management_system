import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { useTaskStore } from '../store/useTaskStore';


export function TaskForm() {
  const [taskName, setTaskName] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(0);
  const { addTask, projects } = useTaskStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskName.trim() || !selectedProjectId) return;

    await addTask(taskName.trim(), selectedProjectId);
    setTaskName('');
    setIsExpanded(false);
  };

  return (
    <motion.div layout className="mb-6">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="relative">
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            placeholder="Add a new task..."
            className="w-full py-3 px-4 pr-12 bg-white border border-gray-300 rounded-lg shadow-sm
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     transition-all duration-200"
          />
          <motion.button
            type="submit"
            whileTap={{ scale: 0.95 }}
            disabled={!taskName.trim() || !selectedProjectId}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500
                     hover:text-blue-600 disabled:text-gray-300 transition-colors"
          >
            <PlusCircle size={24} />
          </motion.button>
        </div>

        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3"
          >
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Project
              </label>
              <select
                value={selectedProjectId}
                onChange={(e) => setSelectedProjectId(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Choose a project</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                New tasks are automatically set to highest priority (#1)
              </p>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => setIsExpanded(false)}
                  className="px-4 py-2 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg
                         transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!taskName.trim() || !selectedProjectId}
                  className="px-4 py-2 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded-lg
                         disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  Add Task
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </form>
    </motion.div>
  );
}

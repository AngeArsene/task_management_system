import React from 'react';
import { motion } from 'framer-motion';
import { useTaskStore } from '../store/useTaskStore';

export function ProjectSelector() {
  const {
    projects, 
    selectedProjectId, 
    setSelectedProject } = useTaskStore();

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Filter by Project
      </label>
      <div className="flex gap-2 flex-wrap">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelectedProject(null)}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors
            ${!selectedProjectId
              ? 'bg-gray-900 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
        >
          All Projects
        </motion.button>
        {projects.map((project) => (
          <motion.button
            key={project.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedProject(project.id)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors
              ${selectedProjectId === project.id
                ? 'text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            style={{
              backgroundColor: selectedProjectId === project.id ? project.color : undefined,
            }}
          >
            {project.name}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

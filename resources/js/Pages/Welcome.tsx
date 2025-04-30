import React, { useEffect } from 'react';
import { useTaskStore } from '../store/useTaskStore';
import { TaskForm } from '../components/TaskForm';
import { TaskList } from '../components/TaskList';
import { AppHeader } from '../components/AppHeader';
import { EmptyState } from '../components/EmptyState';
import { ProjectSelector } from '../components/ProjectSelector';
import { ProjectManager } from '../components/ProjectManager';
import { motion, AnimatePresence } from 'framer-motion';
import { usePage } from '@inertiajs/react';
import { Task, Project } from '../types/task';

function App() {
  const page = usePage<any>(); // disables TS checking for props

  const { tasks: initialTasks, projects: initialProjects, selectedProject } = page.props;

  const {
    tasks,
    selectedProjectId,
    setTasks,
    setProjects,
    setSelectedProject,
  } = useTaskStore();

  // Load backend-provided data into the store on mount
  useEffect(() => {
    setTasks(initialTasks);
    setProjects(initialProjects);
    setSelectedProject(selectedProject);

  }, [initialTasks, initialProjects, selectedProject, setTasks, setProjects, setSelectedProject]);


  const filteredTasks = selectedProjectId
    ? tasks.filter(task => String(task.projectId) === String(selectedProjectId))
    : tasks;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto max-w-3xl px-4 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-xl shadow-sm px-6 py-8"
        >
          <AppHeader />

          <ProjectManager />
          <ProjectSelector />
          <TaskForm />

          <AnimatePresence mode="wait">
            {filteredTasks.length > 0 ? (
              <motion.div
                key="tasklist"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">Your Tasks</h2>
                  <div className="text-sm text-gray-500">
                    {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'}
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4">
                  Drag and drop to reorder tasks. Priority will update automatically.
                </p>

                <TaskList tasks={filteredTasks} />
              </motion.div>
            ) : (
              <motion.div
                key="emptystate"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <EmptyState onAddSampleTasks={() => console.log('Add sample tasks')} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <footer className="mt-8 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} TaskFlow App • Drag and drop powered by dnd-kit</p>
        </footer>
      </div>
    </div>
  );
}

export default App;

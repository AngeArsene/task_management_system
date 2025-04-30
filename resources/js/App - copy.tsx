import React, { useEffect } from 'react';
import { useTaskStore } from './store/useTaskStore';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { AppHeader } from './components/AppHeader';
import { EmptyState } from './components/EmptyState';
import { ProjectSelector } from './components/ProjectSelector';
import { ProjectManager } from './components/ProjectManager';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const { tasks, addTask, updateTask, deleteTask, reorderTasks, selectedProjectId } = useTaskStore();

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      reorderTasks(JSON.parse(savedTasks));
    }
  }, [reorderTasks]);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const filteredTasks = selectedProjectId
    ? tasks.filter(task => task.projectId === selectedProjectId)
    : tasks;

  const addSampleTasks = () => {
    addTask('Review project requirements', 'work');
    addTask('Create wireframes for new feature', 'work');
    addTask('Meeting with product team', 'work');
    addTask('Update documentation', 'work');
  };

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
          <TaskForm onAddTask={addTask} />

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

                <TaskList
                  tasks={filteredTasks}
                  onUpdate={updateTask}
                  onDelete={deleteTask}
                  onReorder={reorderTasks}
                />
              </motion.div>
            ) : (
              <motion.div
                key="emptystate"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <EmptyState onAddSampleTasks={addSampleTasks} />
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

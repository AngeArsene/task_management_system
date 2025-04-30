import { create } from 'zustand';
import { Task, Project } from '../types/task';
import { api } from '../utils/api';

interface TaskState {
  tasks: Task[];
  projects: Project[];
  selectedProjectId: string | null;

  setTasks: (tasks: Task[]) => void;
  setProjects: (projects: Project[]) => void;
  setSelectedProject: (id: string | null) => void;

  addTask: (name: string, projectId: string) => Promise<void>;
  updateTask: (id: string, name: string) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  reorderTasks: (tasks: Task[]) => Promise<void>;

  addProject: (name: string) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  projects: [],
  selectedProjectId: null,

  setTasks: (tasks) => set({ tasks }),
  setProjects: (projects) => set({ projects }),

  setSelectedProject: (id) => {
    if (get().selectedProjectId === id) return;
    set({ selectedProjectId: id });
  },

  addTask: async (name, projectId) => {
    try {
      const response = await api.post('/tasks', { name, project_id: projectId });
      const newTask: Task = response.data;

      // Append only if it matches current filter
      const currentProjectId = get().selectedProjectId;
      if (!currentProjectId || String(currentProjectId) === String(projectId)) {
        set({ tasks: [...get().tasks, newTask] });
      }
    } catch (e) {
      console.error('Failed to add task:', e);
    }
  },

  updateTask: async (id, name) => {
    try {
      await api.put(`/tasks/${id}`, { name });
      const updatedTasks = get().tasks.map(task =>
        task.id === id ? { ...task, name } : task
      );
      set({ tasks: updatedTasks });
    } catch (e) {
      console.error('Failed to update task:', e);
    }
  },

  deleteTask: async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      const filtered = get().tasks.filter(task => task.id !== id);
      set({ tasks: filtered });
    } catch (e) {
      console.error('Failed to delete task:', e);
    }
  },

  reorderTasks: async (orderedTasks) => {
    try {
      await api.post('/tasks/reorder', {
        orderedTaskIds: orderedTasks.map(task => task.id),
      });
      set({ tasks: orderedTasks });
    } catch (e) {
      console.error('Failed to reorder tasks:', e);
    }
  },

  addProject: async (name) => {
    try {
      const response = await api.post('/projects', { name });
      const newProject: Project = response.data;
      set({ projects: [...get().projects, newProject] });
    } catch (e) {
      console.error('Failed to add project:', e);
    }
  },

  deleteProject: async (id) => {
    try {
      await api.delete(`/projects/${id}`);
      const filtered = get().projects.filter(p => p.id !== id);
      set({ projects: filtered });
      set({ tasks: get().tasks.filter(task => task.projectId !== id) });

      if (get().selectedProjectId === String(id)) {
        get().setSelectedProject(null);
      }
    } catch (e) {
      console.error('Failed to delete project:', e);
    }
  },
}));

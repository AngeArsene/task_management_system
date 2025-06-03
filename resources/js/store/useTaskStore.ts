import { create } from 'zustand';
import { api } from '../utils/api';
import { Task, Project } from '@/types/index';

interface TaskState {
  tasks: Task[];
  projects: Project[];
  selectedProjectId: number | null;
  
  setTasks: (tasks: Task[]) => void;
  setProjects: (projects: Project[]) => void;
  setSelectedProject: (id: number | null) => void;
  
  addTask: (name: string, projectId: number) => Promise<void>;
  updateTask: (id: number, name: string) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  reorderTasks: (tasks: Task[]) => Promise<void>;
  
  addProject: (name: string) => Promise<void>;
  deleteProject: (id: number) => Promise<void>;
}

type StateProps = Pick<TaskState, 'tasks'|'projects'|'selectedProjectId'>;

export const useTaskStore: () => TaskState = create<TaskState>((set: (a:Partial<StateProps>) => void, get: () => StateProps) => ({
  tasks: [] as Task[],
  projects: [] as Project[],
  selectedProjectId: null,

  setTasks: (tasks: Task[]) => set({ tasks }),
  setProjects: (projects: Project[]) => set({ projects }),

  setSelectedProject: (id: number | null) => {
    if (get().selectedProjectId === id) return;
    set({ selectedProjectId: id });
  },

  addTask: async (name: string, projectId: number) => {
    try {
      const { data: newTask } = await 
        api.post('/tasks', { name, project_id: projectId }) as { data: Task };

      // Append only if it matches current filter
      const currentProjectId = get().selectedProjectId;
      if (!currentProjectId || currentProjectId === projectId) {
        set({ tasks: [...get().tasks, newTask] });
      }
    } catch (e) {
      console.error('Failed to add task:', e);
    }
  },

  updateTask: async (id: number, name: string): Promise<void> => {
    try {
      const { data: upToDateTask } = await 
        api.put(`/tasks/${id}`, { name }) as { data: Task };

      const updatedTasks: Task[] = get().tasks.map((task: Task) =>
        task.id === id ? upToDateTask : task
      );
      
      set({ tasks: updatedTasks });
    } catch (e) {
      console.error('Failed to update task:', e);
    }
  },

  deleteTask: async (id: number): Promise<void> => {
    try {
      const { data: { status } } = await 
        api.delete(`/tasks/${id}`) as { data: {status: 'deleted'} };

      const filtered: Task[] = get().tasks.filter((task: Task) => task.id !== id);
      status === 'deleted' && set({ tasks: filtered });
    } catch (e) {
      console.error('Failed to delete task:', e);
    }
  },

  reorderTasks: async (orderedTasks: Task[]): Promise<void> => {
    try {
      const { data: { status } } = await api.post('/tasks/reorder', {
        orderedTaskIds: orderedTasks.map(task => task.id),
      }) as {data: {status: 'ok'}};

      // Keep the existing tasks that weren't reordered (from other projects)
      const currentTasks = get().tasks.filter(
        task => !orderedTasks.some(ot => ot.id === task.id)
      );

      status === 'ok' && set({ tasks: [...currentTasks, ...orderedTasks] });
    } catch (e) {
      console.error('Failed to reorder tasks:', e);
    }
  },

  addProject: async (name: string) => {
    try {
      const { data: newProject } = await 
        api.post('/projects', { name }) as { data: Project };
      
      set({ projects: [...get().projects, newProject] });
    } catch (e) {
      console.error('Failed to add project:', e);
    }
  },

  deleteProject: async (id: number) => {
    try {
      await api.delete(`/projects/${id}`);
      const filtered = get().projects.filter((p: Project) => p.id !== id);
      set({ projects: filtered });
      set({ tasks: get().tasks.filter((task: Task) => task.projectId !== id) });

      if (get().selectedProjectId === id) {
        set({ selectedProjectId: null })
      }
    } catch (e) {
      console.error('Failed to delete project:', e);
    }
  },
}));

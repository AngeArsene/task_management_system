export interface Project {
  id: string;
  name: string;
  color: string;
}

export interface Task {
  id: string;
  name: string;
  priority: number;
  projectId: string;
  createdAt: string;
  updatedAt: string;
}
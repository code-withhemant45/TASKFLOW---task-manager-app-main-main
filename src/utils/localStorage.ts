
import { Task } from "../types";

const STORAGE_KEY = 'task-manager-tasks';

export const getTasks = (): Task[] => {
  try {
    const storedTasks = localStorage.getItem(STORAGE_KEY);
    if (!storedTasks) return [];

    const tasks = JSON.parse(storedTasks);
    // Convert string dates back to Date objects
    return tasks.map((task: any) => ({
      ...task,
      createdAt: new Date(task.createdAt),
      dueDate: task.dueDate ? new Date(task.dueDate) : undefined
    }));
  } catch (error) {
    console.error('Error getting tasks from localStorage:', error);
    return [];
  }
};

export const saveTasks = (tasks: Task[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Error saving tasks to localStorage:', error);
  }
};

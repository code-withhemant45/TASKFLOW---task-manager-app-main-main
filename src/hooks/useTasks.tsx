
import { useState, useEffect } from "react";
import { Task, FilterStatus, Priority } from "../types";
import { getTasks, saveTasks } from "../utils/localStorage";
import { useToast } from "@/components/ui/use-toast";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<FilterStatus>('all');
  const { toast } = useToast();

  // Load tasks from localStorage on initial render
  useEffect(() => {
    const storedTasks = getTasks();
    setTasks(storedTasks);
  }, []);

  // Apply filter whenever tasks or filter changes
  useEffect(() => {
    switch (filter) {
      case 'active':
        setFilteredTasks(tasks.filter(task => !task.completed));
        break;
      case 'completed':
        setFilteredTasks(tasks.filter(task => task.completed));
        break;
      default:
        setFilteredTasks(tasks);
        break;
    }
  }, [tasks, filter]);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  // Add a new task
  const addTask = (title: string, description: string, dueDate: Date | undefined, priority: Priority) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description: description || undefined,
      completed: false,
      createdAt: new Date(),
      dueDate,
      priority
    };

    setTasks(prevTasks => [newTask, ...prevTasks]);
    toast({
      title: "Task added",
      description: "Your new task has been created."
    });
  };

  // Toggle task completed status
  const toggleTaskStatus = (id: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Edit an existing task
  const editTask = (id: string, updates: Partial<Task>) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, ...updates } : task
      )
    );
    toast({
      title: "Task updated",
      description: "Your task has been updated successfully."
    });
  };

  // Delete a task
  const deleteTask = (id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    toast({
      title: "Task deleted",
      description: "Your task has been deleted successfully."
    });
  };

  return {
    tasks: filteredTasks,
    addTask,
    toggleTaskStatus,
    editTask,
    deleteTask,
    filter,
    setFilter
  };
};

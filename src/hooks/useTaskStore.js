import { useEffect, useMemo, useState } from 'react';
import { todayKey } from '../lib/dateUtils';

const STORAGE_KEY = 'work-diary-tasks-v1';

const parseTasks = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const useTaskStore = () => {
  const [tasks, setTasks] = useState(() => parseTasks());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    const newTask = {
      ...task,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [newTask, ...prev]);
    return newTask;
  };

  const updateTask = (id, nextTask) => {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, ...nextTask } : task)));
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const todayTasks = useMemo(() => tasks.filter((task) => task.date === todayKey()), [tasks]);

  return { tasks, addTask, updateTask, deleteTask, todayTasks };
};

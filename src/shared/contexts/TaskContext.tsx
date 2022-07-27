import React, { createContext, useCallback, useEffect, useState } from "react";
import { ITask } from "../service/api/task/Task";
import { Feedback } from "../util/Feedback";

interface ITaskContextData {
  tasks: ITask[];
  defineTasks: (tasks: ITask[]) => void;
  handleCreateTask: (title: string) => void;
  handleDeleteTask: (id: string) => void;
  handleCheckTask: (id: string) => void;
  handleChangeTitle: (id: string, value: string) => void;
}
export const TaskContext = createContext<ITaskContextData>(
  {} as ITaskContextData
);

interface ITaskProcider {
  children: React.ReactNode;
}

export const TaskProvider: React.FC<ITaskProcider> = ({
  children,
}: ITaskProcider) => {
  const [tasks, setTasks] = useState<ITask[]>([]);

  const handleCreateTask = useCallback(
    (title: string) => {
      const newTask: ITask = {
        id: Math.random().toString(),
        order: tasks.length + 1,
        title: title,
        done: false,
      };

      const allTasks = [...tasks, newTask];
      allTasks.sort((a, b) => {
        return a.order - b.order;
      });
      setTasks([...allTasks]);
    },
    [tasks]
  );

  const handleDeleteTask = useCallback(
    (id: string) => {
      const result = tasks.filter((task) => task.id !== id);
      setTasks(result);
      Feedback("Task deleted successfully", "success");
    },
    [tasks]
  );

  const handleChangeTitle = useCallback(
    (id: string, value: string) => {
      const task = tasks.find((task) => task.id === id);
      const result = tasks.filter((task) => task.id !== id);
      if (task !== undefined) {
        task.title = value;
        const allTasks = [...result, task];
        allTasks.sort((a, b) => {
          return a.order - b.order;
        });
        setTasks([...allTasks]);
      }
    },
    [tasks]
  );

  const defineTasks = (tasks: ITask[]) => {
    setTasks([...tasks]);
  };

  const handleCheckTask = useCallback(
    (id: string) => {
      const taskChecked = tasks.find((task) => task.id === id);
      const result = tasks.filter((task) => task.id !== id);
      if (taskChecked !== undefined) {
        taskChecked.done = !taskChecked.done;
        const allTasks = [...result, taskChecked];
        allTasks.sort((a, b) => {
          return a.order - b.order;
        });

        setTasks([...allTasks]);
      }
    },
    [tasks]
  );

  return (
    <TaskContext.Provider
      value={{
        tasks: tasks,
        defineTasks: defineTasks,
        handleCreateTask: handleCreateTask,
        handleDeleteTask: handleDeleteTask,
        handleCheckTask: handleCheckTask,
        handleChangeTitle: handleChangeTitle,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

import { useContext } from "react";

import { TaskContext } from "../contexts/TaskContext";

export const useTask = () => {
  const context = useContext(TaskContext);

  return context;
};

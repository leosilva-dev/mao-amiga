import { useContext } from "react";

import { PomoContext } from "../contexts/PomoContext";

export const usePomo = () => {
  const context = useContext(PomoContext);

  return context;
};

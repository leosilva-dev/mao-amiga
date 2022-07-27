import React, { createContext, useCallback, useEffect, useState } from "react";
import { ITask } from "../service/api/task/Task";
import { Feedback } from "../util/Feedback";

interface IPomoContextData {
  secondsAmount: number;
  defaultTime: number;
  defineDefaultTime: (value: number) => void;
  decreaseSecondsAmount: () => void;
  isCounting: boolean;
  defineIsCounting: (value: boolean) => void;
  startPomo: () => void;
  stopPomo: () => void;
}
export const PomoContext = createContext<IPomoContextData>(
  {} as IPomoContextData
);

// const TOTAL_SECONDS_AMOUNT = 15 * 60 - 895;

interface IPomoProvider {
  children: React.ReactNode;
}

export const PomoProvider: React.FC<IPomoProvider> = ({
  children,
}: IPomoProvider) => {
  const [defaultTime, setDefaultTime] = useState(15 * 60);
  const [secondsAmount, setSecondsAmount] = useState(defaultTime);
  const [isCounting, setIsCounting] = useState(false);

  const decreaseSecondsAmount = () => {
    setSecondsAmount((old) => old - 1);
  };

  const defineDefaultTime = (value: number) => {
    setDefaultTime(value);
  };

  const defineIsCounting = useCallback((value: boolean) => {
    setIsCounting(value);
  }, []);

  const startPomo = () => {
    setIsCounting(true);
    setSecondsAmount(defaultTime);
    console.log("start pomo");
  };

  const stopPomo = () => {
    setIsCounting(false);
    setSecondsAmount(defaultTime);
    console.log("stop pomo");
  };

  useEffect(() => {
    if (secondsAmount > 0 && isCounting) {
      setTimeout(() => {
        if (secondsAmount > 0) {
          decreaseSecondsAmount();
        }
      }, 1000);
    } else {
      defineIsCounting(false);
    }
  }, [defineIsCounting, isCounting, secondsAmount]);

  return (
    <PomoContext.Provider
      value={{
        secondsAmount: secondsAmount,
        defaultTime: defaultTime,
        defineDefaultTime: defineDefaultTime,
        isCounting: isCounting,
        decreaseSecondsAmount: decreaseSecondsAmount,
        defineIsCounting: defineIsCounting,
        startPomo: startPomo,
        stopPomo: stopPomo,
      }}
    >
      {children}
    </PomoContext.Provider>
  );
};

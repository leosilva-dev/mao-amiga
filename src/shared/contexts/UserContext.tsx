import React, { createContext } from "react";
import { useUserData } from "@nhost/react";

interface IUserContextData {
  user: any;
}
export const UserContext = createContext<IUserContextData>(
  {} as IUserContextData
);

interface IUserProvider {
  children: React.ReactNode;
}

export const UserProvider: React.FC<IUserProvider> = ({
  children,
}: IUserProvider) => {
  const user = useUserData();

  return (
    <UserContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

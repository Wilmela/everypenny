"use client";

import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  ReactNode,
  useState,
} from "react";

type ContextType = {
  toggled: boolean;
  setToggled: Dispatch<SetStateAction<boolean>>;
};

const NavContext = createContext<ContextType>({} as ContextType);

export const NavContextProvider = ({ children }: { children: ReactNode }) => {
  const [toggled, setToggled] = useState(false);
  return (
    <NavContext.Provider value={{ toggled, setToggled }}>
      {children}
    </NavContext.Provider>
  );
};

export const useNavContext = () => useContext(NavContext);

import React, { useState, createContext, useMemo } from "react";

type Props = {
  children: JSX.Element;
};

export const CursorContext = createContext<any>("pointer");

export function CursorProvider({ children }: Props) {
  // different types possible so far : "pointer" , "hover", "scrollIndicator"
  const [cursorType, setCursorType] = useState<string>("pointer");

  const contextValue = useMemo(() => {
    return { cursorType, setCursorType };
  }, [cursorType]);

  return (
    <CursorContext.Provider value={contextValue}>
      {children}
    </CursorContext.Provider>
  );
}

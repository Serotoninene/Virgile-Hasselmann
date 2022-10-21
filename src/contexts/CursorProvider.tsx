import React, { useState, createContext, useMemo } from "react";

type Props = {
  children: JSX.Element;
};

export const CursorContext = createContext<any>("scrollIndicator");

export function CursorProvider({ children }: Props) {
  // different types possible so far : "pointer" , "hover", "scrollIndicator"
  const [cursorType, setCursorType] = useState<string>("scrollIndicator");

  const changeCursorType = (e: string): void => setCursorType(e);

  const contextValue = useMemo(() => {
    return { cursorType, changeCursorType };
  }, [cursorType]);

  return (
    <CursorContext.Provider value={contextValue}>
      {children}
    </CursorContext.Provider>
  );
}

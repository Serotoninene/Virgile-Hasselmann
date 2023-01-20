import React, { createContext, useEffect, useMemo, useState } from "react";

interface Props {
  children: JSX.Element;
}

export const IsLoadedContext = createContext<any>({ isLoaded: false });
export const LoadingContext = createContext<any>(0);

function getInitialState() {
  const isLoaded =
    typeof window !== "undefined"
      ? window.localStorage.getItem("isLoaded")
      : "false";

  if (!isLoaded) return "false";
  return isLoaded;
}

export function IsLoadedProvider({ children }: Props) {
  const [isLoaded, setIsLoaded] = useState<string>(getInitialState());
  const [loadingState, setLoadingState] = useState(0);

  const isLoadedContextValue = useMemo(() => {
    return { isLoaded, setIsLoaded };
  }, [isLoaded]);

  const LoadingStateContextValue = useMemo(() => {
    return { loadingState, setLoadingState };
  }, [loadingState]);

  useEffect(() => {
    window.localStorage.setItem("isLoaded", isLoaded?.toString());
  }, [isLoaded]);

  return (
    <IsLoadedContext.Provider value={isLoadedContextValue}>
      <LoadingContext.Provider value={LoadingStateContextValue}>
        {children}
      </LoadingContext.Provider>
    </IsLoadedContext.Provider>
  );
}

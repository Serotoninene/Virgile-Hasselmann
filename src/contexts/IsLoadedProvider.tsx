import React, { createContext, useMemo, useState } from "react";

interface Props {
  children: JSX.Element;
}

export const IsLoadedContext = createContext<any>({ isLoaded: false });
export const LoadingContext = createContext<any>(0);

export function IsLoadedProvider({ children }: Props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadingState, setLoadingState] = useState(0);

  const isLoadedContextValue = useMemo(() => {
    return { isLoaded, setIsLoaded };
  }, [isLoaded]);

  const LoadingStateContextValue = useMemo(() => {
    return { loadingState, setLoadingState };
  }, [loadingState]);

  return (
    <IsLoadedContext.Provider value={isLoadedContextValue}>
      <LoadingContext.Provider value={LoadingStateContextValue}>
        {children}
      </LoadingContext.Provider>
    </IsLoadedContext.Provider>
  );
}

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export const IsLoadedContext = createContext<any>(true);

function getInitialState() {
  const isLoaded =
    typeof window !== "undefined" && window.localStorage.getItem("isLoaded");
  if (!isLoaded) return "false";
  return isLoaded;
}

export function IsLoadedProvider({ children }: { children: React.ReactNode }) {
  const localData = getInitialState();
  const [isLoaded, setIsLoaded] = useState<boolean>();
  const [loadingState, setLoadingState] = useState(0);

  useEffect(() => {
    localData === "true" ? setIsLoaded(true) : setIsLoaded(false);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("isLoaded", JSON.stringify(isLoaded));
  }, [isLoaded]);

  const value = useMemo(
    () => ({ isLoaded, setIsLoaded, loadingState, setLoadingState }),
    [isLoaded, loadingState]
  );

  return (
    <IsLoadedContext.Provider value={value}>
      {children}
    </IsLoadedContext.Provider>
  );
}

export function useIsLoadedContext() {
  return useContext(IsLoadedContext);
}

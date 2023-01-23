import React, {
  createContext,
  RefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

interface Props {
  children: JSX.Element;
}

export const IsLoadedContext = createContext<any>(false);
export const LoadingContext = createContext<any>(0);

function getInitialState() {
  const isLoaded =
    typeof window !== "undefined" && window.localStorage.getItem("isLoaded");

  if (!isLoaded) return "false";

  return isLoaded;
}

export function IsLoadedProvider({ children }: Props) {
  const localData = getInitialState();
  const [isLoaded, setIsLoaded] = useState<boolean>();
  const loadingState = useRef() as RefObject<HTMLDivElement>;

  const isLoadedContextValue = useMemo(() => {
    return { isLoaded, setIsLoaded };
  }, [isLoaded]);

  const LoadingStateContextValue = useMemo(() => {
    return loadingState;
  }, [loadingState]);

  useEffect(() => {
    localData === "true" ? setIsLoaded(true) : setIsLoaded(false);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("isLoaded", JSON.stringify(isLoaded));
  }, [isLoaded]);

  return (
    <IsLoadedContext.Provider value={isLoadedContextValue}>
      <LoadingContext.Provider value={LoadingStateContextValue}>
        {children}
      </LoadingContext.Provider>
    </IsLoadedContext.Provider>
  );
}

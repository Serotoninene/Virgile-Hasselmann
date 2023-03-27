import React, {
  useState,
  createContext,
  useMemo,
  useEffect,
  useContext,
} from "react";

interface Props {
  children: JSX.Element;
}

export const AuthContext = createContext<any>({ userStatus: "USER" });

function getInitialState() {
  const userStatus =
    typeof window !== "undefined"
      ? window.localStorage.getItem("userStatus")
      : "USER";

  return userStatus;
}

export function AuthProvider({ children }: Props) {
  // 2 different roles for the user : "USER" and "ADMIN", by default, every one is USER
  const [userStatus, setUserStatus] = useState("USER");

  useEffect(() => {
    const localData = window.localStorage.getItem("userStatus");
    setUserStatus(localData || "USER");
  }, []);

  useEffect(() => {
    window.localStorage.setItem("userStatus", userStatus);
  }, [userStatus]);

  const contextValue = useMemo(() => {
    return { userStatus, setUserStatus };
  }, [userStatus]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  return useContext(AuthContext);
};

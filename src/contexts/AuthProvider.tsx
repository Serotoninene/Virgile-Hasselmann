import React, { useState, createContext, useMemo } from "react";

interface Props {
  children: JSX.Element;
}

export const AuthContext = createContext<any>({ userStatus: "USER" });

export function AuthProvider({ children }: Props) {
  // 2 different roles for the user : "USER" and "ADMIN", by default, every one is USER
  const [userStatus, setUserStatus] = useState("USER");

  const contextValue = useMemo(() => {
    return { userStatus, setUserStatus };
  }, [userStatus]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

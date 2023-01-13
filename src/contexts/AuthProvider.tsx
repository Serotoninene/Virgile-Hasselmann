import React, { useState, createContext, useMemo, useEffect } from "react";

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
  const localData = getInitialState();
  // 2 different roles for the user : "USER" and "ADMIN", by default, every one is USER
  const [userStatus, setUserStatus] = useState(localData || "USER");

  // const saveUserStatus = (status: string) => {
  //   setUserStatus(status);
  //   typeof window !== "undefined" &&
  //     window.localStorage.setItem("userStatus", JSON.stringify(status));
  // };

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

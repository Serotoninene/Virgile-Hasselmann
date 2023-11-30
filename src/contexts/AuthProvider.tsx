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

interface AuthContextType {
  userStatus: string;
  loading: boolean;
  setUserStatus: (el: string) => void;
}

export const AuthContext = createContext<AuthContextType>({
  userStatus: "USER",
  loading: true,
  setUserStatus: () => {},
});

function getInitialState() {
  const userStatus =
    typeof window !== "undefined"
      ? window.localStorage.getItem("userStatus")
      : "USER";

  return userStatus || "USER";
}

export function AuthProvider({ children }: Props) {
  const [userStatus, setUserStatus] = useState("USER");
  const [loading, setLoading] = useState(true);

  const handleChangeUserStatus = (userStatus: string) => {
    setUserStatus(userStatus);
    window.localStorage.setItem("userStatus", userStatus);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const initialUserStatus = window.localStorage.getItem("userStatus");
      setUserStatus(initialUserStatus || "USER");
    }
    setLoading(false);
  }, []);

  const contextValue = useMemo(() => {
    return { userStatus, loading, setUserStatus: handleChangeUserStatus };
  }, [userStatus]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  return useContext(AuthContext);
};

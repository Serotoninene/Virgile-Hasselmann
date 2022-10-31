import { FormEvent, useContext, useEffect, useState } from "react";
// Context
import { AuthContext } from "@src/contexts/AuthProvider";
// Trpc
import { trpc } from "@server/utils/trpc";

interface Props {
  setIsLogin: (e: boolean) => void;
}

const UserLogin = ({ setIsLogin }: Props) => {
  const [password, setPassword] = useState("");
  const login = trpc.user.login.useMutation({
    onSuccess(data) {
      auth.setUserStatus(data);
    },
  });

  // Context
  const auth = useContext(AuthContext);

  useEffect(() => {
    console.log(login);
  }, [login]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login.mutate(password);
    setIsLogin(false);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input
        type="password"
        className="mb-4 p-1 bg-transparent outline-none border border-light text-light block"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button>ok</button>
    </form>
  );
};

export default UserLogin;

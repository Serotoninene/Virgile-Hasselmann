import { FormEvent, useContext, useState } from "react";
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login.mutate(password);
    setIsLogin(false);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input
        type="password"
        className="block text-[7vw] italic text-center bg-transparent outline-none text-light placeholder-light"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Mot de passe"
      />
    </form>
  );
};

export default UserLogin;

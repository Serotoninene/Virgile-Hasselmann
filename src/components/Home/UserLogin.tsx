import { FormEvent, useContext, useState } from "react";
// Context
import { AuthContext } from "@src/contexts/AuthProvider";
// Trpc
import { trpc } from "@server/utils/trpc";

const UserLogin = () => {
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
  };

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)} className="z-10">
        <input
          type="password"
          className="block text-[7vw] italic text-center bg-transparent outline-none text-light placeholder-light"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mot de passe"
        />
      </form>
      <div className="absolute w-full h-full"></div>
    </>
  );
};

export default UserLogin;

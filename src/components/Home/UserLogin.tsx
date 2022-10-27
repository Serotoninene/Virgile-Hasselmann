import { FormEvent, useContext, useState } from "react";
import { trpc } from "@server/utils/trpc";

const UserLogin = () => {
  const [password, setPassword] = useState("");
  const login = trpc.user.login.useMutation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login.mutate(password);
  };

  return (
    <form
      className="absolute top-[250px] pointer-events-auto z-30"
      onSubmit={(e) => handleSubmit(e)}
    >
      <input
        type="password"
        className="mb-4 p-1 bg-transparent outline-none border border-light text-light"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button>ok</button>
    </form>
  );
};

export default UserLogin;

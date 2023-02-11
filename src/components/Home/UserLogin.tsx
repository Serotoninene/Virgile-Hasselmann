import { FormEvent, useState } from "react";
// Context
import { useAuthContext } from "@src/contexts/AuthProvider";
// Trpc
import { trpc } from "@server/utils/trpc";

const UserLogin = () => {
  const { userStatus, setUserStatus } = useAuthContext();
  const [password, setPassword] = useState("");
  const login = trpc.user.login.useMutation({
    onSuccess(data) {
      setUserStatus(data);
    },
  });

  // const signUp = trpc.user.signUp.useMutation();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // signUp.mutate(password);
    login.mutate(password);
  };
  const handleSignOut = () => {
    setUserStatus("USER");
  };

  if (userStatus === "ADMIN")
    return <button onClick={handleSignOut}>SignOut</button>;

  return (
    <>
      {" "}
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

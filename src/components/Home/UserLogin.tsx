import { FormEvent, useState } from "react";
// Context
import { useAuthContext } from "@src/contexts/AuthProvider";
// Trpc
import { trpc } from "@server/utils/trpc";
import Button from "../Utils/Button";
import { useRouter } from "next/router";

const UserLogin = () => {
  const router = useRouter();
  const { userStatus, setUserStatus } = useAuthContext();
  const [password, setPassword] = useState("");
  const login = trpc.user.login.useMutation({
    onSuccess(data) {
      setUserStatus(data || "USER");
    },
  });

  const signUp = trpc.user.signUp.useMutation();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // signUp.mutate(password);
    login.mutate(password);
    router.push("/admin");
  };

  const handleSignOut = () => {
    setUserStatus("USER");
  };

  if (userStatus === "ADMIN")
    return <button onClick={handleSignOut}>SignOut</button>;

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
        <div className="text-center sm:hidden">
          <Button> Se connecter </Button>
        </div>
      </form>
      <div className="absolute w-full h-full"></div>
    </>
  );
};

export default UserLogin;

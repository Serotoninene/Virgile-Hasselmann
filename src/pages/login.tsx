import React, { useContext, useEffect } from "react";
import { motion } from "framer-motion";
// Components
import UserLogin from "@src/components/Home/UserLogin";
import { AuthContext } from "@src/contexts/AuthProvider";
import { useRouter } from "next/router";

const loginAnim = {
  hidden: { opacity: 0 },
  shown: { opacity: 1 },
};

function Login() {
  const router = useRouter();
  const { userStatus } = useContext(AuthContext);
  console.log(userStatus);

  useEffect(() => {
    if (userStatus === "ADMIN") {
      router.push("/");
    }
  }, [userStatus]);

  return (
    <motion.div
      key="login"
      variants={loginAnim}
      initial="hidden"
      animate="shown"
      exit="hidden"
      className={`flex absolute top-0 left-0 h-screen w-screen backdrop-blur-lg  justify-center items-center`}
    >
      <UserLogin />
    </motion.div>
  );
}

export default Login;

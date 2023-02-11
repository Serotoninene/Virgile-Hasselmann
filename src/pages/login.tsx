import React from "react";
import { motion } from "framer-motion";
// Components
import UserLogin from "@src/components/Home/UserLogin";

const loginAnim = {
  hidden: { opacity: 0 },
  shown: { opacity: 1 },
};

function Login() {
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

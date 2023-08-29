import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useIsLoadedContext } from "@src/contexts/IsLoadedProvider";

export default function LoadingFrame() {
  const { isLoaded, loadingState } = useIsLoadedContext();

  return (
    <AnimatePresence>
      {!isLoaded ? (
        <motion.div
          key={"loading"}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="h-screen w-full flex justify-center items-center fixed top-0 left-0 bg-black z-50"
        >
          <p className="text-xl">{loadingState}</p>
        </motion.div>
      ) : (
        <div key={"loaded"}></div>
      )}
    </AnimatePresence>
  );
}

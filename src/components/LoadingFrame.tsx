import React, { useContext, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  IsLoadedContext,
  LoadingContext,
} from "@src/contexts/IsLoadedProvider";
import AnimatedLetters from "./Utils/AnimatedLetters";
import useDebounce from "@src/hooks/useDebounce";

type Props = {};

export default function LoadingFrame({}: Props) {
  const { isLoaded } = useContext(IsLoadedContext);
  const { loadingState } = useContext(LoadingContext);
  const slowedLoadingState = useDebounce(loadingState, 500);

  return (
    <AnimatePresence>
      {!isLoaded ? (
        <motion.div
          key={"loading"}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="h-screen w-full flex justify-center items-center fixed top-0 left-0 bg-black z-50"
        >
          <p className="text-xl">
            <AnimatePresence>
              <AnimatedLetters
                key={loadingState}
                string={slowedLoadingState.toString()}
                absolute
              />
            </AnimatePresence>
          </p>
        </motion.div>
      ) : (
        <div key={"loaded"}></div>
      )}
    </AnimatePresence>
  );
}

import React, { useState, useEffect, useRef } from "react";
import { LayoutGroup, motion } from "framer-motion";
import useWindowSize from "../../utils/customHooks/useWindowSize";

const Input = ({ input, setInput, setFormStep, isEndAnimation }) => {
  const delay = 1.5;

  const inputSizeRef = useRef();
  const { width } = useWindowSize();
  const [counter, setCounter] = useState(0);
  const [inputWidth, setInputWidth] = useState("100%");
  const isGrey = counter === 0; // if counter <=1 : it means it is a prewritten sentence, so let's make the text grey
  const prewrittenInput = "flourish with protected ecosystems";

  // Setting the prewritten sentence inside the input
  useEffect(() => {
    setInput(prewrittenInput.toUpperCase());
  }, []);

  // if the input has started being writtent enough = last step (the generate button appears)
  useEffect(() => {
    input.length > 3
      ? setFormStep("done")
      : input.length !== 0 && setFormStep("fillingInput");
  }, [input, setFormStep]);

  // passed a certain width, set the width of the input as the width of the "sizeRecorder" (ie. the input rewritten in a hidden div that we can measure live)
  useEffect(() => {
    if (!inputSizeRef.current) return;
    const inputSize = inputSizeRef.current.offsetWidth;
    if (inputSize < width * 0.5) {
      setInputWidth(width * 0.5); // too small
    } else if (inputSize >= width * 0.9) {
      setInputWidth(width * 0.9 + "px"); // too big
    } else {
      setInputWidth(inputSize + 10 + "px"); // adjustable
    }
  }, [width, input]);

  const generateRandomSentence = () => {
    setCounter(0);
    setInput(prewrittenInput.toUpperCase());
  };

  const emptyInput = () => {
    setCounter((counter) => counter + 1);
    if (counter >= 1) return;
    setFormStep("fillingInput"); // hiding the generate btn when emptying the input
    setInput("");
  };

  return (
    <LayoutGroup>
      <motion.div
        animate={{ opacity: isEndAnimation ? 0 : 1 }}
        transition={{
          duration: 1,
          layout: { duration: 0 },
        }}
        layout
      >
        <div className="inputContainer">
          <motion.input
            // layout
            style={{ width: inputWidth }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1,
              delay: 1.5 * delay,
            }} // second in animation
            className={isGrey ? "grey" : "dark"}
            onClick={emptyInput}
            type="text"
            value={input.toUpperCase()}
            onChange={(e) => setInput(e.target.value.toUpperCase())}
          />
          <div ref={inputSizeRef} className="sizeRecorder">
            {input.toUpperCase()}
          </div>
          <motion.span
            className="line"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, delay: 1 * delay }} // first in animation
          />
        </div>
        <motion.div
          className="surpriseBtn"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 2 * delay }} // third in animation
          onClick={generateRandomSentence}
        >
          <p>WRITE YOUR PERSONAL WISH OR GENERATE</p>
        </motion.div>
      </motion.div>
    </LayoutGroup>
  );
};

export default Input;

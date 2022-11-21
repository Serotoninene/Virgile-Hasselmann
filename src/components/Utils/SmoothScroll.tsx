import { useRef, RefObject, useState, useEffect } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
// Custom Hooks
import useWindowSize from "@hooks/useWindowSize";

type Props = {
  children: JSX.Element;
};

export default function SmoothScroll({ children }: Props) {
  const { width } = useWindowSize();
  const scrollContainer = useRef() as RefObject<HTMLDivElement>;
  const [pageHeight, setPageHeight] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      // added a setTimeout so the page has the time to load and it still fits
      const scrollContainerSize =
        scrollContainer.current?.getBoundingClientRect();

      scrollContainerSize && setPageHeight(scrollContainerSize.height);
    }, 500);
  }, [width]);

  const { scrollY } = useScroll(); // measures how many pixels user has scrolled vertically
  // as scrollY changes between 0px and the scrollable height, create a negative scroll value...
  // ... based on current scroll position to translateY
  const transform = useTransform(scrollY, [0, pageHeight], [0, -pageHeight]);
  const physics = { damping: 15, mass: 0.17, stiffness: 55 }; // easing of smooth scroll
  const spring = useSpring(transform, physics); // apply easing to the negative scroll value

  return (
    <>
      <motion.div
        ref={scrollContainer}
        style={{ y: spring }} // translateY of scroll container using negative scroll value
        className="app fixed overflow-hidden w-screen"
      >
        {children}
      </motion.div>
      <motion.div style={{ height: pageHeight }} />
    </>
  );
}

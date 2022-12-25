import useWindowSize from "@src/hooks/useWindowSize";
import React, { useEffect, useMemo } from "react";

type Props = {};

export default function Test({}: Props) {
  const { height } = useWindowSize();

  // Calculate 1vh value in pixels
  // based on window inner height
  const vh = useMemo(() => (height ? height * 0.01 : 0), [height]);
  useEffect(() => {
    if (!height) return;
    const vh = height * 0.01;
    document.documentElement.style.setProperty("--vh", vh + "px");
  }, [height]);

  return (
    <div id="Test">
      <p className="text-center">top</p>
      <p className="absolute bottom-0 text-center">bottom</p>
    </div>
  );
}

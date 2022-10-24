import { useContext, useEffect, useState } from "react";
import type { NextPage } from "next";
import { userAgentFromString } from "next/server";
// framer motion
import { useScroll } from "framer-motion";
// Context
import { CursorContext } from "@src/contexts/CursorProvider";
// Components
import DarkGradients from "@src/components/Home/DarkGradients";
import HeroVideo from "@src/components/Home/HeroVideo";
import MainMenu from "@src/components/Home/MainMenu";
// Custom Hook
import useWindowSize from "@src/hooks/useWindowSize";

const Home: NextPage = () => {
  // Safari 3.0+ "[object HTMLElementConstructor]"
  const browser = userAgentFromString(undefined).browser.name;
  const isSafariUsed = browser === "Safari";

  const { scrollY } = useScroll();
  const { width } = useWindowSize();
  const { changeCursorType } = useContext(CursorContext);
  const [goToMainMenu, setGoToMainMenu] = useState<boolean>(false);

  useEffect(() => {
    changeCursorType("scrollIndicator");
  }, []);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      if (latest < 0) return;

      let direction = scrollY.getPrevious() - latest; // <- from top to bottom on other browsers thant safari
      // if we're on safari, weirdly enought we have to reverse the order of the scroll so it's from top to bottom
      isSafariUsed && (direction = latest - scrollY.getPrevious());

      if (direction < 0) {
        setGoToMainMenu(true);
        changeCursorType("pointer");
      } else {
        setGoToMainMenu(false);
        changeCursorType("scrollIndicator");
      }
    });
  }, [scrollY]);

  return (
    <div id="Home" className="h-[105vh]">
      <div
        className="fixed w-screen"
        onTouchMove={() => setGoToMainMenu(!goToMainMenu)}
      >
        <MainMenu goToMainMenu={goToMainMenu} />
        <HeroVideo />
        <DarkGradients /> {/* <-- must stay on the bottom of the component */}
      </div>
      <div className="bg-dark scrollContainer h-[105vh]" />
    </div>
  );
};

export default Home;

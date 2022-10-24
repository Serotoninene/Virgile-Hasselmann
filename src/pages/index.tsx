import { useContext, useEffect, useState, WheelEvent } from "react";
import type { NextPage } from "next";
// framer motion
import { useScroll } from "framer-motion";
// Context
import { CursorContext } from "@src/contexts/CursorProvider";
// Components
import DarkGradients from "@src/components/Home/DarkGradients";
import HeroVideo from "@src/components/Home/HeroVideo";
import MainMenu from "@src/components/Home/MainMenu";

const Home: NextPage = () => {
  const { scrollY } = useScroll();
  const { changeCursorType } = useContext(CursorContext);
  const [goToMainMenu, setGoToMainMenu] = useState<boolean>(false);

  const triggerMainMenuAnim = (e: WheelEvent<HTMLDivElement>) => {
    if (e.deltaY > 0) {
      setGoToMainMenu(true);
      changeCursorType("pointer");
    } else {
      setGoToMainMenu(false);
      changeCursorType("scrollIndicator");
    }
  };

  useEffect(() => {
    changeCursorType("scrollIndicator");
  }, []);

  return (
    <div id="Home" className="w-screen" onWheel={(e) => triggerMainMenuAnim(e)}>
      <MainMenu goToMainMenu={goToMainMenu} />
      <HeroVideo />
      <DarkGradients /> {/* <-- must stay on the bottom of the component */}
    </div>
  );
};

export default Home;

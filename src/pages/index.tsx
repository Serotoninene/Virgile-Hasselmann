import { TouchEvent, useContext, useEffect, useState, WheelEvent } from "react";
import type { NextPage } from "next";
// Context
import { CursorContext } from "@src/contexts/CursorProvider";
// Components
import DarkGradients from "@src/components/Home/DarkGradients";
import HeroVideo from "@src/components/Home/HeroVideo";
import MainMenu from "@src/components/Home/MainMenu";
import useWindowSize from "@src/hooks/useWindowSize";

const Home: NextPage = () => {
  const { width } = useWindowSize();
  const { changeCursorType } = useContext(CursorContext);
  const [goToMainMenu, setGoToMainMenu] = useState<boolean>(false);

  const triggerMainMenuAnimMobile = (e: TouchEvent<HTMLDivElement>) => {
    if (width! < 768) return;

    let lastY;
    let currentY = e.touches[0].clientY;
    if (lastY && currentY > lastY) {
      // moved down
      setGoToMainMenu(true);
      changeCursorType("pointer");
    } else if (lastY && currentY < lastY) {
      // moved up
      setGoToMainMenu(false);
      changeCursorType("scrollIndicator");
    }
    lastY = currentY;
  };

  const triggerMainMenuAnimDesk = (e: WheelEvent<HTMLDivElement>) => {
    if (width! > 768) return;

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
    <div
      id="Home"
      className="w-screen"
      onWheel={(e) => triggerMainMenuAnimDesk(e)}
      onTouchMove={(e) => triggerMainMenuAnimMobile(e)}
    >
      <MainMenu goToMainMenu={goToMainMenu} />
      <HeroVideo />
      <DarkGradients /> {/* <-- must stay on the bottom of the component */}
    </div>
  );
};

export default Home;

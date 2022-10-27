import { TouchEvent, useContext, useState, WheelEvent } from "react";
import type { NextPage } from "next";
// Context
import { CursorContext } from "@src/contexts/CursorProvider";
// Components
import DarkGradients from "@components/Home/DarkGradients";
import HeroVideo from "@components/Home/HeroVideo";
import MainMenu from "@components/Home/MainMenu";
import UserLogin from "@components/Home/UserLogin";

const Home: NextPage = () => {
  const { setCursorType } = useContext(CursorContext);
  const [goToMainMenu, setGoToMainMenu] = useState<boolean>(false);
  let lastY: number = 0;

  const toggleMainMenu = (toggle: boolean) => {
    setGoToMainMenu(toggle);
    setCursorType(toggle ? "pointer" : "scrollIndicator");
  };

  const triggerMainMenuAnimMobile = (e: TouchEvent<HTMLDivElement>) => {
    let currentY = e.touches[0].clientY;
    if (currentY < lastY) {
      toggleMainMenu(true);
    } else if (currentY > lastY) {
      toggleMainMenu(false);
    }
    lastY = currentY;
  };

  const triggerMainMenuAnimDesk = (e: WheelEvent<HTMLDivElement>) => {
    if (e.deltaY > 0) {
      toggleMainMenu(true);
    } else {
      toggleMainMenu(false);
    }
  };

  return (
    <div
      id="Home"
      className="w-screen h-screen"
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

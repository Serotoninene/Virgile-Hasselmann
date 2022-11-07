import { TouchEvent, useState, WheelEvent } from "react";
import type { NextPage } from "next";
// Components
import DarkGradients from "@components/Home/DarkGradients";
import HeroVideo from "@components/Home/HeroVideo";
import MainMenu from "@components/Home/MainMenu";

const Home: NextPage = () => {
  const [goToMainMenu, setGoToMainMenu] = useState<boolean>(false);
  let lastY: number = 0;

  const triggerMainMenuAnimMobile = (e: TouchEvent<HTMLDivElement>) => {
    let currentY = e.touches[0].clientY;
    if (currentY < lastY) {
      setGoToMainMenu(true);
    } else if (currentY > lastY) {
      setGoToMainMenu(false);
    }
    lastY = currentY;
  };

  const triggerMainMenuAnimDesk = (e: WheelEvent<HTMLDivElement>) => {
    if (e.deltaY > 0) {
      setGoToMainMenu(true);
    } else {
      setGoToMainMenu(false);
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

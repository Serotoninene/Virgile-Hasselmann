import { useEffect, useState } from "react";
import type { NextPage } from "next";
// Components
import DarkGradients from "@src/components/Home/DarkGradients";
import HeroVideo from "@src/components/Home/HeroVideo";
import MainMenu from "@src/components/Home/MainMenu";
import { useScroll } from "framer-motion";
import useWindowSize from "@src/hooks/useWindowSize";
//

const Home: NextPage = () => {
  const { scrollY } = useScroll();
  const [goToMainMenu, setGoToMainMenu] = useState<boolean>(false);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      if (latest < 0) return;

      if (scrollY.getPrevious() - latest < 0) {
        setGoToMainMenu(true);
      } else {
        setGoToMainMenu(false);
      }
    });
  }, [scrollY]);

  return (
    <div id="Home" className="h-[105vh]">
      <div className="fixed w-screen">
        <MainMenu goToMainMenu={goToMainMenu} />
        <HeroVideo />
        <DarkGradients /> {/* <-- must stay on the bottom of the component */}
      </div>
      <div className="bg-dark scrollContainer h-[105vh]" />
    </div>
  );
};

export default Home;

import { RefObject, useEffect, useRef, useState } from "react";
import type { NextPage } from "next";
// Components
import DarkGradients from "@src/components/Home/DarkGradients";
import HeroVideo from "@src/components/Home/HeroVideo";
import MainMenu from "@src/components/Home/MainMenu";
import { useScroll } from "framer-motion";
import useDebounce from "@src/hooks/useDebounce";
import useWindowSize from "@src/hooks/useWindowSize";
import { useScrollBlock } from "@src/hooks/useScrollBlock";
//

const Home: NextPage = () => {
  const { scrollY } = useScroll();
  const { height } = useWindowSize();
  const [goToMainMenu, setGoToMainMenu] = useState<boolean>(false);

  // const scrollTo = (e: number) => {
  //   blockScroll();
  //   window.scrollTo({
  //     top: height,
  //   });
  //   allowScroll();
  // };

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
    <div id="Home">
      <div className="fixed w-screen">
        <MainMenu goToMainMenu={goToMainMenu} />
        <HeroVideo />
        <DarkGradients /> {/* <-- must stay on the bottom of the component */}
      </div>
      <div className="bg-dark h-[105vh]" />
    </div>
  );
};

export default Home;

import { useEffect, useRef, useState } from "react";
import type { NextPage } from "next";
// Components
import DarkGradients from "@src/components/Home/DarkGradients";
import HeroVideo from "@src/components/Home/HeroVideo";
import MainMenu from "@src/components/Home/MainMenu";
import { useScroll } from "framer-motion";
import useDebounce from "@src/hooks/useDebounce";
//

const Home: NextPage = () => {
  const { scrollY } = useScroll();
  const [goToMainMenu, setGoToMainMenu] = useState<boolean>(false);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      if (latest < 0) return;

      scrollY.getPrevious() - latest < 0
        ? setGoToMainMenu(true)
        : setGoToMainMenu(false);
    });
  }, [scrollY]);

  console.log(goToMainMenu);

  return (
    <>
      <div className="fixed w-screen">
        <MainMenu goToMainMenu={goToMainMenu} />
        <HeroVideo />
        <DarkGradients /> {/* <-- must stay on the bottom of the component */}
      </div>
      <div className="bg-slate-500 h-[150vh]" />
    </>
  );
};

export default Home;

import type { NextPage } from "next";
// Components
import DarkGradients from "components/Home/DarkGradients";
import HeroVideo from "components/Home/HeroVideo";
import MainMenu from "components/Home/MainMenu";

const Home: NextPage = () => {
  return (
    <div className="relative">
      <MainMenu />
      <HeroVideo />
      <DarkGradients /> {/* <-- must stay on the bottom of the component */}
    </div>
  );
};

export default Home;

import type { NextPage } from "next";
// Components
import DarkGradients from "components/Home/DarkGradients";
import HeroVideo from "components/Home/HeroVideo";

const Home: NextPage = () => {
  return (
    <div className="relative">
      <HeroVideo />
      <DarkGradients /> {/* <-- must stay on the bottom of the component */}
    </div>
  );
};

export default Home;

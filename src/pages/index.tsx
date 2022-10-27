import {
  FormEvent,
  TouchEvent,
  useContext,
  useEffect,
  useState,
  WheelEvent,
} from "react";
import type { NextPage } from "next";
// Context
import { CursorContext } from "@src/contexts/CursorProvider";
// Components
import DarkGradients from "@src/components/Home/DarkGradients";
import HeroVideo from "@src/components/Home/HeroVideo";
import MainMenu from "@src/components/Home/MainMenu";
import { trpc } from "@server/utils/trpc";

import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

const UserInput = () => {
  const [password, setPassword] = useState("");
  const login = trpc.user.login.useMutation();
  console.log(login.data);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login.mutate(password);
  };

  return (
    <form
      className="absolute top-[250px] pointer-events-auto z-30"
      onSubmit={(e) => handleSubmit(e)}
    >
      <input
        type="password"
        className="mb-4 p-1 bg-transparent outline-none border border-light text-light"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button>ok</button>
    </form>
  );
};

const Home: NextPage = () => {
  const { changeCursorType } = useContext(CursorContext);
  const [goToMainMenu, setGoToMainMenu] = useState<boolean>(false);
  let lastY: number = 0;

  const toggleMainMenu = (toggle: boolean) => {
    setGoToMainMenu(toggle);
    changeCursorType(toggle ? "pointer" : "scrollIndicator");
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
      <UserInput />
      <MainMenu goToMainMenu={goToMainMenu} />
      <HeroVideo />
      <DarkGradients /> {/* <-- must stay on the bottom of the component */}
    </div>
  );
};

export default Home;

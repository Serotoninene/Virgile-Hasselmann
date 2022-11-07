import React, { useState } from "react";
// Next
import Head from "next/head";
// Components
import Navbar from "./Navbar";

type Props = {
  children: JSX.Element;
};

const Layout = ({ children }: Props): JSX.Element => {
  // Trigger animation only after scrolling a bit (like 100vh)
  const [isNavVisible, setIsNavVisible] = useState(false);

  const toggleNav = (e: React.WheelEvent<HTMLElement>) => {
    if (e.deltaY < 0) {
      setIsNavVisible(true); // if wheel back up => shows the navbar
    } else {
      setIsNavVisible(false);
    }
  };

  return (
    <div
      id="App"
      className="relative"
      onWheel={(e) => {
        toggleNav(e);
      }}
    >
      <Head>
        <title>Virgile Hasselmann</title>
        <meta
          name="description"
          content="Virgile Hasselmann, a video and photo portfolio"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="fixed w-screen z-50">
        <Navbar isNavVisible={isNavVisible} />
      </header>
      <main className="min-h-screen">
        {/* Background noise */}
        <img
          src="assets/noise.png"
          className="w-full h-full fixed top-0 left-0"
        />
        <div>{children}</div>
      </main>
    </div>
  );
};

export default Layout;

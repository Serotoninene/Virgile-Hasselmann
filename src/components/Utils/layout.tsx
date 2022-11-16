import React, { useEffect, useState } from "react";
// Next
import Head from "next/head";
// Components
import Navbar from "./Navbar";
// Hooks
import useWindowSize from "@src/hooks/useWindowSize";
import { useRouter } from "next/router";

type Props = {
  children: JSX.Element;
};

const Layout = ({ children }: Props): JSX.Element => {
  const { pathname } = useRouter();
  const { width } = useWindowSize();
  const [isNavVisible, setIsNavVisible] = useState(true);

  const toggleNav = (e: React.WheelEvent<HTMLElement>) => {
    // if on mobile, the navbar is always visible
    if (width && width < 640) return;

    // if on the photos, the navbar is always visible
    if (pathname === "/photos") return;

    if (e.deltaY < 0) {
      setIsNavVisible(true); // if wheel back up => shows the navbar
    } else {
      setIsNavVisible(false);
    }
  };

  useEffect(() => {
    // if on mobile, the navbar is always visible
    if (width && width < 640) setIsNavVisible(true);
  }, [width]);

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
        <Navbar pathname={pathname} isNavVisible={isNavVisible} />
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

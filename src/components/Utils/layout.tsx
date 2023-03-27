import React, { useEffect, useState } from "react";
// Next
import Head from "next/head";
// Components
import Navbar from "./Navbar";
// Hooks
import useWindowSize from "@src/hooks/useWindowSize";
import { useRouter } from "next/router";
import Image from "next/image";

type Props = {
  children: JSX.Element;
};

const Layout = ({ children }: Props): JSX.Element => {
  const { pathname } = useRouter();
  const { width, height } = useWindowSize();
  const [isNavVisible, setIsNavVisible] = useState(true);

  // Triggered on on wheel event
  const toggleNav = (e: React.WheelEvent<HTMLElement>) => {
    // if on mobile, the navbar is always visible
    if (width && width < 640) return;

    // if on the photos, the navbar is always visible
    if (pathname === "/photos") return;

    if (pathname === "/videos/[id]") return;

    if (e.deltaY < 0) {
      setIsNavVisible(true); // if wheel back up => shows the navbar
    } else {
      setIsNavVisible(false);
    }
  };

  useEffect(() => {
    // hide the navbar if on the video/[id] page
    if (pathname === "/videos/[id]") {
      setIsNavVisible(false);
    }
  }, [pathname]);

  useEffect(() => {
    // Set vh to be the actual viewport height and be usable on mobile
    if (!height) return;
    const vh = height * 0.01;
    document.documentElement.style.setProperty("--vh", vh + "px");
  }, [height]);

  useEffect(() => {
    // if on mobile, the navbar is always visible
    if ((width && width < 640) || pathname === "/photos") setIsNavVisible(true);
  }, [width, pathname]);

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
      <main>
        <div className="noise"></div>
        {/* Background noise */}
        <div className="h-full w-full fixed top-0 left-0">
          <Image alt="noise" src="/assets/noise.png" layout="fill" />
        </div>
        <div className="relative">{children}</div>
      </main>
    </div>
  );
};

export default Layout;

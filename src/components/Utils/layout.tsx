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
  const { height } = useWindowSize();

  useEffect(() => {
    // Set vh to be the actual viewport height and be usable on mobile
    if (!height) return;
    const vh = height * 0.01;
    document.documentElement.style.setProperty("--vh", vh + "px");
  }, [height]);

  return (
    <div id="App" className="relative">
      <Head>
        <title>Virgile Hasselmann</title>
        <meta
          name="description"
          content="Virgile Hasselmann, a video and photo portfolio"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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

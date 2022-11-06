import React, { useMemo } from "react";
// Next
import Head from "next/head";
// Components
import Navbar from "./Navbar";
import CustomCursor from "./CustomCursor";
// Hook
import useWindowSize from "@hooks/useWindowSize";

type Props = {
  children: JSX.Element;
};

const Layout = ({ children }: Props): JSX.Element => {
  const { width } = useWindowSize();

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
      {width! > 768 && <CustomCursor />}
      <img
        src="assets/noise.png"
        className="w-full h-full fixed top-0 left-0"
      />
      <header className="fixed w-screen z-50">
        <Navbar />
      </header>
      <main className="min-h-screen">
        <div>{children}</div>
      </main>
    </div>
  );
};

export default Layout;

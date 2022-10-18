import { useState, useEffect } from "react";
// Next
import { useRouter } from "next/router";
import Head from "next/head";
// Components
// import Header from "./Header";
// import Footer from "./Footer";

type Props = {
  children: JSX.Element;
};

const Layout = ({ children }: Props): JSX.Element => {
  return (
    <>
      <Head>
        <title>Virgile Hasselmann</title>
        <meta
          name="description"
          content="Virgile Hasselmann, a video and photo portfolio"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>{children}</div>
      </main>
    </>
  );
};

export default Layout;

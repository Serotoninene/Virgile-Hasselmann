// Next
import Image from "next/image";
import Head from "next/head";
// Components
import Navbar from "./Navbar";
// import Header from "./Header";
// import Footer from "./Footer";

type Props = {
  children: JSX.Element;
};

const Layout = ({ children }: Props): JSX.Element => {
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
      <header className="fixed w-screen">
        <Navbar />
      </header>
      <main className="h-screen">
        <div>{children}</div>
      </main>
    </div>
  );
};

export default Layout;

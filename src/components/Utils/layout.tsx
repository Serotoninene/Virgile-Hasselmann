// Next
import Head from "next/head";
// Components
import Navbar from "./Navbar";

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
      <header className="fixed w-screen z-10">
        <Navbar />
      </header>
      <main className="min-h-screen">
        <div>{children}</div>
      </main>
    </div>
  );
};

export default Layout;

import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Virgile Hasselmann</title>
        <meta
          name="description"
          content="Virgile Hasselmann, a video and photo portfolio"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="text-center text-blue-600">
        <h1>Welcome to Virgile&apos;s portfolio</h1>
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;

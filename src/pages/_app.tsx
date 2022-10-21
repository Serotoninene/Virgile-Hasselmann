import "../styles/globals.scss";
import type { AppProps } from "next/app";
// Context
import { CursorProvider } from "@src/contexts/CursorProvider";
// Components
import Layout from "@src/components/Utils/layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CursorProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CursorProvider>
  );
}

export default MyApp;

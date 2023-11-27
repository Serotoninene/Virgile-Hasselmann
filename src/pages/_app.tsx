import "../styles/globals.scss";
import type { AppProps } from "next/app";
// Context
import { AuthProvider } from "@src/contexts/AuthProvider";
// trpc
import { trpc } from "@server/utils/trpc";
// Components
import Layout from "@src/components/Utils/layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}

export default trpc.withTRPC(MyApp);

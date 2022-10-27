import "../styles/globals.scss";
import type { AppProps } from "next/app";
// Context
import { AuthProvider } from "@src/contexts/AuthProvider";
import { CursorProvider } from "@src/contexts/CursorProvider";
// trpc
import { trpc } from "@server/utils/trpc";

// Components
import Layout from "@src/components/Utils/layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <CursorProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CursorProvider>
    </AuthProvider>
  );
}

export default trpc.withTRPC(MyApp);

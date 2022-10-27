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
    <CursorProvider>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </CursorProvider>
  );
}

export default trpc.withTRPC(MyApp);

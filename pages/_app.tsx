import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/layout/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NextPage } from "next";
import { Auth } from "@/components/layout/Auth";
import "@rainbow-me/rainbowkit/styles.css";

import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";
import { WagmiConfig, createConfig, configureChains } from "wagmi";
import { optimismGoerli } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [optimismGoerli],
  [publicProvider()]
);

const projectId = "f73ac33ebd813e7aacf407ce2c5ea8ad";

const { connectors } = getDefaultWallets({
  appName: "exech",
  chains,
  projectId,
});

const wagmiClient = createConfig({
  autoConnect: true,
  connectors,
  webSocketPublicClient,
  publicClient,
});

export type ExtendedNextPage<P = any, IP = P> = NextPage<P, IP> & {
  requireAuth?: boolean;
};

export default function App({
  Component,
  pageProps: { ...pageProps },
  err,
}: AppProps & { err: Error }) {
  return (
    <WagmiConfig config={wagmiClient}>
      <RainbowKitProvider chains={chains} modalSize="compact">
        {(Component as ExtendedNextPage).requireAuth ? (
          <Auth>
            <Layout>
              <Component {...pageProps} err={err} />
            </Layout>
          </Auth>
        ) : (
          <Component {...pageProps} />
        )}
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

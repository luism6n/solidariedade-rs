import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Roboto } from "next/font/google";
import Head from "next/head";
import { PWAHeaders } from "../components/PWAHeaders";
import ReactGA from "react-ga4";

// If loading a variable font, you don't need to specify the font weight
const roboto = Roboto({ subsets: ['latin'], weight: ["400", "500", "700"] });
const GA_METRIC_ID: string = (process.env.NEXT_PUBLIC_GA_METRIC_ID as string);


export default function App({ Component, pageProps }: AppProps) {
  ReactGA.initialize(GA_METRIC_ID);
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />
        <title>{process.env.NEXT_PUBLIC_SITE_NAME}</title>
        <PWAHeaders />
      </Head>
      <main className={roboto.className}>
        <Component {...pageProps} />
      </main>
    </>
  );
}

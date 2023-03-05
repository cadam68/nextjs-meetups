import "../styles/globals.css";
import Layout from "../components/layout/Layout";
import { usePageLoading } from "../lib/usePageLoading";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  const { isPageLoading } = usePageLoading();
  return (
    <Layout>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="React Meetups" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {isPageLoading ? <i>Loading...</i> : <Component {...pageProps} />}
    </Layout>
  );
}

export default MyApp;

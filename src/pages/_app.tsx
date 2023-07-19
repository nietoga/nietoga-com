import { Meta } from '@nietoga/nietoga-com/components/page';
import '@nietoga/nietoga-com/pages/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <>
            <Meta
                name="viewport"
                content="width=device-width, initial-scale=1"
            />
            <Head>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Component {...pageProps} />
        </>
    );
};

export default App;

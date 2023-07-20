import { Meta } from '@nietoga/nietoga-com/components/page';
import '@nietoga/nietoga-com/pages/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import createEmotionCache from '../utils/createEmotionCache';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from '../themes/theme';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache;
}

const App = ({
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps,
}: MyAppProps) => {
    return (
        <CacheProvider value={emotionCache}>
            <Meta
                name="viewport"
                content="width=device-width, initial-scale=1"
            />
            <Head>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <ThemeProvider theme={theme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                <Component {...pageProps} />
            </ThemeProvider>
        </CacheProvider>
    );
};

export default App;

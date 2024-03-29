import { CacheProvider, EmotionCache } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import { Meta } from '@nietoga/nietoga-com/components/page';
import { theme } from '@nietoga/nietoga-com/themes/theme';
import { createEmotionCache } from '@nietoga/nietoga-com/utils/createEmotionCache';

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
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Component {...pageProps} />
                </ThemeProvider>
            </StyledEngineProvider>
        </CacheProvider>
    );
};

export default App;

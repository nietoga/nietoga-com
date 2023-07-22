import { SITE_NAME } from '@nietoga/nietoga-com/constants';
import Head from 'next/head';

interface Props {
    title: string;
}

export const Title = ({ title }: Props) => {
    return (
        <Head>
            <title>{`${title} | ${SITE_NAME}`}</title>
        </Head>
    );
};

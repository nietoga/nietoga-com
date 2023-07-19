import Head from 'next/head';

interface Props {
    title: string;
}

const TITLE_SUFFIX = 'nietoga-com';

export const Title = ({ title }: Props) => {
    return (
        <Head>
            <title>{`${title} | ${TITLE_SUFFIX}`}</title>
        </Head>
    );
};

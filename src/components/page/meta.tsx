import Head from 'next/head';

interface Props {
    name: string;
    content: string;
}

export const Meta = ({ name, content }: Props) => {
    return (
        <Head>
            <meta name={name} content={content} />
        </Head>
    );
};

export default Meta;

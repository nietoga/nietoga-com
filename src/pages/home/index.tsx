import { Meta, Title } from '@nietoga/nietoga-com/components/page';
import Image from 'next/image';
import Link from 'next/link';
import styles from './index.module.css';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { Layout } from '../../components/layout';

export const Home = () => {
    return (
        <Layout>
            <Title title="Homepage" />
            <Meta name="description" content="Home page of nietoga-com" />
            <Box className={styles.main}>
                <Image
                    src="/nyan-cat.gif"
                    alt="Silly image of a space cat throwing rainbows down its ass"
                    width={500}
                    height={500}
                />

                <Box>
                    <Typography variant="h3">Projects</Typography>
                    <ul>
                        <li>
                            <Link href="/etl">ETL module</Link>
                        </li>
                    </ul>
                </Box>
            </Box>
        </Layout>
    );
};

export default Home;

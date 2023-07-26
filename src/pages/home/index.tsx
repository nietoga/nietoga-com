import { Box } from '@mui/material';
import Image from 'next/image';

import { Layout } from '../../components/layout';
import { Meta, Title } from '../../components/page';
import { ProjectsList } from '../../components/projectsList/projectsList';
import styles from './index.module.css';

export const Home = () => {
    return (
        <Layout>
            <Title title="Homepage" />
            <Meta name="description" content="Home page of nietoga-com" />
            <Box className={styles.main}>
                <Image
                    src="/images/nyan-cat.gif"
                    alt="Silly image of a space cat throwing rainbows down its ass"
                    width={500}
                    height={500}
                />
                <ProjectsList />
            </Box>
        </Layout>
    );
};

export default Home;

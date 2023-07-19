import { Meta, Title } from '@nietoga/nietoga-com/component/page';
import Image from 'next/image';
import styles from './index.module.css';

export const Home = () => {
    return (
        <>
            <Title title="Homepage" />
            <Meta name="description" content="Home page of nietoga-com" />
            <main className={styles.main}>
                <Image
                    src="/nyan-cat.gif"
                    alt="Silly image of a space cat throwing rainbows down its ass"
                    width={500}
                    height={500}
                />
            </main>
        </>
    );
};

export default Home;

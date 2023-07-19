import { Meta, Title } from '@nietoga/nietoga-com/component/page';
import Image from 'next/image';
import Link from 'next/link';
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

                <div>
                    <h1>Pages</h1>
                    <ul>
                        <li>
                            <Link href="/etl">ETL module</Link>
                        </li>
                    </ul>
                </div>
            </main>
        </>
    );
};

export default Home;

import { AppBar, Toolbar, Typography } from '@mui/material';
import { SITE_NAME } from '@nietoga/nietoga-com/constants';
import Link from 'next/link';

import styles from './navbar.module.css';

export const Navbar = () => {
    return (
        <AppBar position="static">
            <nav>
                <Toolbar>
                    <Typography variant="h4">
                        <Link className={styles['logo__link']} href="/">
                            {SITE_NAME}
                        </Link>
                    </Typography>
                </Toolbar>
            </nav>
        </AppBar>
    );
};

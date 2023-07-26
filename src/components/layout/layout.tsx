import { Container } from '@mui/material';
import { ReactNode } from 'react';

import { Navbar } from '../navbar';

interface LayoutProps {
    children?: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
    return (
        <>
            <Navbar />
            <main>
                <Container>{children}</Container>
            </main>
        </>
    );
};

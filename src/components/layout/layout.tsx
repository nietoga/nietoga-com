import { Container } from '@mui/material';
import React, { ReactNode } from 'react';

import { Navbar } from '../navbar';

interface LayoutProps {
    children?: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <Navbar />
            <main>
                <Container>{children}</Container>
            </main>
        </>
    );
};

import { Container } from '@mui/material';
import { ReactNode } from 'react';
import { Navbar } from '../navbar/navbar';

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

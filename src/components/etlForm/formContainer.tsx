import { Box, BoxProps } from '@mui/material';
import { ReactNode } from 'react';

interface FormContainerProps extends BoxProps {
    children: ReactNode;
}

export const FormContainer = ({
    children,
    ...otherProps
}: FormContainerProps) => {
    return (
        <Box sx={{ my: '2rem', mx: 'auto' }} {...otherProps}>
            {children}
        </Box>
    );
};

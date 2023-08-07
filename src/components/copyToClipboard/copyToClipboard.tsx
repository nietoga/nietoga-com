import { ContentCopy } from '@mui/icons-material';
import { Box, Button, Tooltip, Typography } from '@mui/material';
import { useCallback, useState } from 'react';

import styles from './copyToClipboard.module.css';

interface Props {
    text: string;
}

export const CopyToClipboard = (props: Props) => {
    const { text } = props;

    const [tooltipText, setTooltipText] = useState('Copy');

    const handleCopyClick = useCallback(async () => {
        await navigator.clipboard.writeText(text);
        setTooltipText('Copied!');
    }, [text]);

    const resetTooltipText = useCallback(() => {
        setTooltipText('Copy');
    }, []);

    return (
        <Box className={styles.container}>
            <Typography variant="body1" noWrap sx={{ p: 1 }}>
                {text}
            </Typography>
            <Tooltip
                title={tooltipText}
                onOpen={resetTooltipText}
                placement="right"
            >
                <Button onClick={handleCopyClick}>
                    <ContentCopy />
                </Button>
            </Tooltip>
        </Box>
    );
};

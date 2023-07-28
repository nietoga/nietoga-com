import { Box, Button, Tooltip, Typography } from '@mui/material';
import { useCallback, useState } from 'react';

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
        <Box>
            <Box
                sx={{
                    width: 100,
                    overflow: 'hidden',
                }}
            >
                <Typography variant="body1" noWrap>
                    {text}
                </Typography>
            </Box>
            <Tooltip
                title={tooltipText}
                onOpen={resetTooltipText}
                placement="right"
            >
                <Button onClick={handleCopyClick}>CopyIcon</Button>
            </Tooltip>
        </Box>
    );
};

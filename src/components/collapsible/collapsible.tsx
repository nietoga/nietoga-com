import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    Card,
    CardContent,
    CardHeader,
    Collapse,
    IconButton,
    capitalize,
} from '@mui/material';
import { ReactNode, useState } from 'react';

interface CollapsibleProps {
    header: string;
    hiddenContent: ReactNode;
}

export const Collapsible = ({ header, hiddenContent }: CollapsibleProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <Card>
            <CardHeader
                title={capitalize(header)}
                action={
                    <IconButton aria-label="settings">
                        {isExpanded ? (
                            <ExpandLessIcon onClick={handleExpand} />
                        ) : (
                            <ExpandMoreIcon onClick={handleExpand} />
                        )}
                    </IconButton>
                }
            />
            <Collapse in={isExpanded} unmountOnExit>
                <CardContent>{hiddenContent}</CardContent>
            </Collapse>
        </Card>
    );
};

import { Collapsible } from '../collapsible/collapsible';

interface LogsProps {
    title: string;
    logs: string;
}

export const Logs = ({ title, logs }: LogsProps) => {
    return <Collapsible header={title} hiddenContent={logs} />;
};

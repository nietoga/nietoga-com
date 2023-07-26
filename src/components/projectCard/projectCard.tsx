import {
    Button,
    Card,
    CardActions,
    CardContent,
    Typography,
} from '@mui/material';
import Link from 'next/link';

interface Project {
    title: string;
    description: string;
    link: string;
}

interface ProjectCardProps {
    project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
    return (
        <Card>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {project.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {project.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Link href={project.link}>
                    <Button size="small">Open</Button>
                </Link>
            </CardActions>
        </Card>
    );
};

import { Box, Typography } from '@mui/material';
import { ProjectCard } from '../projectCard';
import { PROJECTS } from '../../constants';

export const ProjectsList = () => {
    return (
        <Box>
            <Typography variant="h3" textAlign="center">
                Projects
            </Typography>
            <ul>
                {PROJECTS.map((project) => (
                    <ProjectCard key={project.title} project={project} />
                ))}
            </ul>
        </Box>
    );
};

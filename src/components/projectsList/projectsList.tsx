import { Box, Typography } from '@mui/material';

import { PROJECTS } from '../../constants';
import { ProjectCard } from '../projectCard';
import styles from './projectList.module.css';

export const ProjectsList = () => {
    return (
        <Box>
            <Typography variant="h3" textAlign="center">
                Projects
            </Typography>
            <Box className={styles.projectList}>
                {PROJECTS.map((project) => (
                    <ProjectCard key={project.title} project={project} />
                ))}
            </Box>
        </Box>
    );
};

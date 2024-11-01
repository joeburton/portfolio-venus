'use client';

import { ChangeEvent, useState, useRef, SetStateAction } from 'react';
import {
  Box,
  Card,
  CardBody,
  Container,
  Input,
  List,
  ListItem,
} from '@chakra-ui/react';
import styles from './FilterProjects.module.css';

import { DisplayItemInterface } from '@/components/DisplayItem';
import { useDetectOutsideClick } from '../../hooks';

interface FilterProjectsProps {
  projects: DisplayItemInterface[];
}

export const FilterProjects = ({ projects }: FilterProjectsProps) => {
  const [filter, setFilter] = useState('');
  const [filteredProjects, setFilteredProjects] = useState<
    DisplayItemInterface[]
  >([]);

  const filterRef = useRef(null);

  useDetectOutsideClick(filterRef, () => {
    setFilteredProjects([]);
    console.log('Focus was removed from the input!');
  });

  const filterProjects = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFilter(value);

    let filteredProjectsResults: SetStateAction<DisplayItemInterface[]> = [];

    filteredProjectsResults =
      value.trim() !== ''
        ? (filteredProjectsResults = projects.filter((project) =>
            project.company.toLowerCase().includes(value.trim().toLowerCase()),
          ))
        : [];

    setFilteredProjects(filteredProjectsResults);
  };

  return (
    <Container maxWidth={'1200px'} margin="0" p={0}>
      <Box>
        <Card>
          <CardBody className={styles.cardBody}>
            <Input
              name="filter-projects"
              placeholder="Filter projects"
              type="text"
              value={filter}
              onChange={filterProjects}
            />
            {filteredProjects && (
              <List className={styles.result}>
                {filteredProjects.map((project, i) => (
                  <ListItem
                    key={project.id}
                    p={2}
                    className={styles.listLtem}
                    data-testid="list-item"
                  >
                    {project?.company}
                  </ListItem>
                ))}
              </List>
            )}
          </CardBody>
        </Card>
      </Box>
    </Container>
  );
};

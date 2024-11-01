'use client';

import { generateUniqueId } from '@/utils';
import { useBreakpointValue } from '@chakra-ui/react';
import { breakpoints } from '@/theme';
import {
  DisplayItem,
  DisplayItemInterface,
  LogoSize,
} from '@/components/DisplayItem';

export const Projects: React.FC<{ projects: DisplayItemInterface[] }> = ({
  projects,
}) => {
  const breakpoint: number = useBreakpointValue(breakpoints) || 0;

  let numberColumns: number = 0;

  if (breakpoint >= 1200) {
    numberColumns = 3;
  } else if (breakpoint >= 960) {
    numberColumns = 2;
  }

  return projects.map((project, i) => {
    const rowEnd = (i + 1) % numberColumns === 0 ? true : false; // every third item.
    return (
      <DisplayItem
        breakpointWidths={{ base: '100%', lg: '50%', xl: '33.3%' }}
        logo={project.logo}
        logoSize={project.logoSize as LogoSize}
        role={project.role}
        company={project.company}
        description={project.description}
        skills={project.skills}
        className={project.className}
        links={project.links}
        rowEnd={rowEnd}
        key={generateUniqueId()}
      />
    );
  });
};

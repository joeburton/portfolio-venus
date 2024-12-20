'use client';

import { useState } from 'react';
import parse from 'html-react-parser';
import { Card, CardBody, Text, Link, Box, Tag, Image } from '@chakra-ui/react';
import {
  ExternalLinkIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@chakra-ui/icons';

import { generateUniqueId } from '../../utils';

import styles from './DisplayItem.module.css';

interface Links {
  visual: string;
  url: string;
}

export type LogoSize = 'small' | 'medium' | 'large';

const logoPixelWidth: { [K in LogoSize]: string } = {
  small: '80px',
  medium: '150px',
  large: '200px',
};

export type DisplayItemInterface = {
  _id?: string;
  rowEnd?: boolean;
  breakpointWidths: { base?: string; lg?: string; xl?: string };
  logo: string;
  logoSize: LogoSize;
  role: string;
  company: string;
  description: string;
  skills: string;
  className?: string;
  links?: Links[];
};

interface SkillsInterface {
  skills: string[];
}

const Skills = ({ skills }: SkillsInterface) => (
  <>
    {skills.map((skill: string) => (
      <Tag
        key={generateUniqueId()}
        role="listitem"
        colorScheme="green"
        m={'2px 2px 2px 0'}
      >
        {skill}
      </Tag>
    ))}
  </>
);

export const DisplayItem = ({
  rowEnd = false,
  breakpointWidths = { base: '100%' },
  logo,
  logoSize,
  role,
  company,
  description,
  skills,
  className = '',
  links = [],
}: DisplayItemInterface) => {
  const [open, setOpen] = useState(false);

  const constrainContent = description?.length > 300 ? true : false;

  const skillSet: string[] = skills?.split(',');

  if (!skillSet?.length) {
    return (
      <Box width={breakpointWidths}>
        <Card variant="elevated" mr={[0, 0, 0, 5]} mb={5} shadow="md">
          <CardBody
            className={styles.cardBody}
            minHeight={{ base: 'auto', lg: '520px', xl: '550px' }}
            textAlign="center"
          >
            In complete data.
          </CardBody>
        </Card>
      </Box>
    );
  }

  return (
    <Box width={breakpointWidths}>
      <Card
        variant="elevated"
        mr={rowEnd ? 0 : [0, 0, 0, 5]}
        mb={5}
        shadow="md"
        className={className}
      >
        <CardBody
          className={styles.cardBody}
          minHeight={{ base: 'auto', lg: '520px', xl: '550px' }}
        >
          <Image
            src={`/assets/logos/${logo}`}
            alt={company}
            width={150}
            height={150}
            style={{
              marginBottom: '20px',
              maxWidth: logoPixelWidth[logoSize],
              width: '100%',
              height: 'auto',
            }}
          />
          <Text fontSize="sm" className={styles.contentItem}>
            Company: {company}
          </Text>
          <Text fontSize="sm" className={styles.contentItem}>
            Role: {role}
          </Text>
          <Text
            role="list"
            aria-label="Skills"
            fontSize="sm"
            className={styles.contentItem}
          >
            {<Skills skills={skillSet} />}
          </Text>
          <Text
            as="div"
            fontSize="sm"
            className={`${styles.contentItem} ${styles.description} `}
            style={constrainContent ? { height: open ? `100%` : `70px` } : {}}
            data-testid="description"
          >
            {parse(description)}
          </Text>
          {constrainContent && (
            <Link
              fontSize="sm"
              display="block"
              p="8px 0"
              data-testid="toggle-text"
              onClick={() => setOpen(!open)}
            >
              {open ? (
                <>
                  Collapse <ChevronUpIcon mx="6px" />
                </>
              ) : (
                <>
                  Expand <ChevronDownIcon mx="6px" />
                </>
              )}
            </Link>
          )}
          {links?.length &&
            links.map((link) => (
              <Link
                fontSize="sm"
                href={link.url}
                isExternal
                key={generateUniqueId()}
                className={styles.link}
              >
                {link.visual} <ExternalLinkIcon mx="6px" />
              </Link>
            ))}
        </CardBody>
      </Card>
    </Box>
  );
};

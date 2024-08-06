"use client";

import { Card, Icon, Link, Text } from "@chakra-ui/react";
import { GitHubMark, LinkedIn, Vercel } from "@/components/CustomIcons";
import styles from "./related.module.css";

export const Related = () => {
  return (
    <ul className={styles.customList}>
      <li>
        <Card variant='filled' p='3'>
          <Text mb='2px'>
            Most of my pet projects and tech exploration code is on GitHub. Feel
            free to have a look, you might even find some relics from the past
            if you dig deep enough.
          </Text>
          <Link href='https://github.com/joeburton' isExternal>
            <Text>
              <Icon as={GitHubMark} width='20px' height='20px' mr='4px' />
              github.com/joeburton
            </Text>
          </Link>
        </Card>
      </li>
      <li>
        <Card variant='filled' p='3'>
          <Text mb='2px'>
            For a full overview of my employment history please take a look at
            my LinkedIn profile.
          </Text>
          <Link href='https://www.linkedin.com/in/joejamesburton' isExternal>
            <Text>
              <Icon as={LinkedIn} width='20px' height='20px' mr='4px' />
              linkedin.com/in/joejamesburton
            </Text>
          </Link>
        </Card>
      </li>
    </ul>
  );
};

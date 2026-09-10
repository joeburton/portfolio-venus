import {
  Card,
  CardBody,
  Box,
  SimpleGrid,
  Heading,
  Text,
  Link,
  Stack,
} from "@chakra-ui/react";
import { PageIntro } from "@/components/PageIntro";

import type { SideProject } from "@/app/api/sideprojects/sideprojects";

import styles from "./sideprojects.module.css";

async function getData(): Promise<SideProject[]> {
  try {
    const res = await fetch(`${process.env.BASE_URL}/api/sideprojects`);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      throw error;
    } else {
      console.error("Unexpected error");
      throw new Error("Unexpected error occurred");
    }
  }
}

// NOTE: These components live inline for now and will be refactored out later.

function SideProjectCard({ name, url, description, link }: SideProject) {
  return (
    <Card variant="elevated" height="100%">
      <CardBody>
        <Stack spacing={3}>
          <Heading as="h2" size="md">
            {name}
          </Heading>
          <Text fontSize="sm" color="gray.500">
            {description}
          </Text>
          <Link href={link} isExternal fontWeight="bold" color="blue.500">
            {url}
          </Link>
        </Stack>
      </CardBody>
    </Card>
  );
}

function SideProjectsList({ projects }: { projects: SideProject[] }) {
  return (
    <SimpleGrid columns={[1, 1, 2, 3]} spacing={5}>
      {projects.map((project) => (
        <SideProjectCard key={project.link} {...project} />
      ))}
    </SimpleGrid>
  );
}

export default async function SideProjects() {
  const projects = await getData();

  return (
    <>
      <PageIntro
        pageTitle="Side Projects"
        subText={<>Check out some of my side projects!</>}
      />
      <div className={styles.sideprojects}>
        <Box maxWidth="900px" m="0 auto">
          <SideProjectsList projects={projects} />
        </Box>
      </div>
    </>
  );
}

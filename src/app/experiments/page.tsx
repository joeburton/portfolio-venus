import {
  Box,
  Card,
  CardBody,
  Grid,
  GridItem,
  Image,
  SimpleGrid,
} from '@chakra-ui/react';

import { items } from '@/data/items';

import { BarGraph } from '@/components/BarGraph';
import { PageIntro } from '@/components/PageIntro';
import { DisplayRandomImages } from '@/components/DisplayRandomImages';
import { SmartCarousel } from '@/components/SmartCarousel';
import { Related } from '@/components/Related';
import { FilterProjects } from '@/components/FilterProjects';
import { DisplayItemInterface } from '@/components/DisplayItem';

import styles from './experiments.module.css';

async function getData() {
  try {
    const res = await fetch(`${process.env.BASE_URL}/api/projects`);
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    return res.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      throw error;
    } else {
      console.error('Unexpected error');
      throw new Error('Unexpected error occurred');
    }
  }
}

export default async function Experiments() {
  const projects: DisplayItemInterface[] = await getData();

  return (
    <>
      <PageIntro pageTitle="Experiments" subText={<>Just playing around.</>} />
      <div className={styles.experiments}>
        <Box maxWidth={'900px'} m="10px auto">
          <Card variant="elevated">
            <CardBody>
              {projects && <FilterProjects projects={projects} />}
            </CardBody>
          </Card>
        </Box>

        <Box maxWidth={'900px'} m="10px auto">
          <Card variant="elevated">
            <CardBody>
              <SimpleGrid columns={[1, 1, 1, 2]} spacing={5}>
                <Box>
                  <Box display={{ base: 'none', lg: 'block' }}>
                    <Image
                      src="/assets/ginger-software-engineer-ai/ginger-software-engineer-ai-7.png"
                      alt="Ginger Software Engineer"
                    />
                  </Box>
                  <SimpleGrid
                    columns={[3]}
                    spacing="10px"
                    mt={[0, 0, 0, '10px']}
                  >
                    <DisplayRandomImages />
                  </SimpleGrid>
                </Box>
                <Box height="auto">
                  <Related />
                </Box>
              </SimpleGrid>
            </CardBody>
          </Card>
        </Box>

        <Box maxWidth={'900px'} m="10px auto">
          <Card variant="elevated">
            <CardBody>
              <BarGraph
                data={[
                  { label: 'A', value: 150 },
                  { label: 'B', value: 234 },
                  { label: 'C', value: 540 },
                  { label: 'D', value: 230 },
                ]}
              />
            </CardBody>
          </Card>
        </Box>
        <Box maxWidth={'900px'} m="10px auto">
          <Card variant="elevated">
            <CardBody>
              <SmartCarousel items={items} />
            </CardBody>
          </Card>
        </Box>
        <Box maxWidth={'900px'} m="10px auto">
          <Card variant="elevated">
            <CardBody>
              <SimpleGrid columns={1} spacing={8}>
                <Grid templateColumns="repeat(5, 1fr)" gap={4}>
                  <GridItem w="100%" h="10" bg="blue.500" />
                  <GridItem w="100%" h="10" bg="blue.500" />
                  <GridItem w="100%" h="10" bg="blue.500" />
                  <GridItem w="100%" h="10" bg="blue.500" />
                  <GridItem w="100%" h="10" bg="blue.500" />
                </Grid>
                <Grid
                  h="300px"
                  templateRows="repeat(2, 1fr)"
                  templateColumns="repeat(5, 1fr)"
                  gap={4}
                >
                  <GridItem rowSpan={2} colSpan={1} bg="tomato">
                    1
                  </GridItem>
                  <GridItem colSpan={2} bg="papayawhip">
                    2
                  </GridItem>
                  <GridItem colSpan={2} bg="papayawhip">
                    3
                  </GridItem>
                  <GridItem colSpan={4} bg="tomato">
                    4
                  </GridItem>
                </Grid>
              </SimpleGrid>
            </CardBody>
          </Card>
        </Box>
        <Box maxWidth={'900px'} m="10px auto">
          <Card variant="elevated">
            <CardBody>content to come</CardBody>
          </Card>
        </Box>
      </div>
    </>
  );
}

"use client";

import { Link } from "@chakra-ui/next-js";

import {
  Box,
  Card,
  CardBody,
  Link as ChakraLink,
  Divider,
  Flex,
  Icon,
  List,
  ListIcon,
  ListItem,
  Show,
  SimpleGrid,
  Text,
  UnorderedList,
} from "@chakra-ui/react";

import { ArrowForwardIcon } from "@chakra-ui/icons";
import { HiMiniAtSymbol, HiMiniDevicePhoneMobile } from "react-icons/hi2";
import { GitHubMark, LinkedIn, Vercel } from "../../CustomIcons";
import styles from "./splash.module.css";

export const SplashContent = () => {
  return (
    <div className={styles.splashPage}>
      <Box maxWidth={"768px"} m='0 auto'>
        <Card variant='elevated'>
          <CardBody>
            <UnorderedList className={styles.experience}>
              <ListItem>
                With over 20 years of industry experience working as a Web
                Developer.
              </ListItem>
              <ListItem>
                For the past 15+ years I&apos;ve specialised in front-end
                development.
              </ListItem>
              <ListItem>
                I&apos;ve worked for a broad range of companies, such as:
                <UnorderedList styleType="'- '">
                  <ListItem>
                    <ChakraLink
                      href='https://www.ogilvy.com/uk/about'
                      isExternal
                      textDecoration='underline'
                    >
                      Ogilvy & Mather
                    </ChakraLink>
                    ,{" "}
                    <ChakraLink
                      href='https://www.tribalworldwide.co.uk/'
                      isExternal
                      textDecoration='underline'
                    >
                      Tribal Worldwide
                    </ChakraLink>
                    ,{" "}
                    <ChakraLink
                      href='https://www.lastminute.com/'
                      isExternal
                      textDecoration='underline'
                    >
                      lastminute.com
                    </ChakraLink>
                    ,{" "}
                    <ChakraLink
                      href='https://www.ge.com/'
                      isExternal
                      textDecoration='underline'
                    >
                      General Electric
                    </ChakraLink>{" "}
                    &{" "}
                    <ChakraLink
                      href='https://www.worldfirst.com'
                      isExternal
                      textDecoration='underline'
                    >
                      World First
                    </ChakraLink>
                  </ListItem>
                </UnorderedList>
              </ListItem>
              <ListItem>
                Currently I work for{" "}
                <ChakraLink
                  href='https://www.publicissapient.com/'
                  isExternal
                  textDecoration='underline'
                >
                  Publicis Sapient
                </ChakraLink>{" "}
                as a Front-end Lead/Manager.
              </ListItem>
            </UnorderedList>
          </CardBody>
        </Card>
        <Card variant='elevated' mt='20px'>
          <CardBody>
            <SimpleGrid columns={[1, 1, 2, 2]} spacing={5}>
              <ul className={styles.customList}>
                <li>
                  <Card variant='filled' p='1'>
                    <ChakraLink href='https://github.com/joeburton' isExternal>
                      <Text>
                        <Icon
                          as={GitHubMark}
                          width='20px'
                          height='20px'
                          mr='4px'
                        />
                        github.com/joeburton
                      </Text>
                    </ChakraLink>
                  </Card>
                </li>
                <li>
                  <Card variant='filled' p='1'>
                    <ChakraLink
                      href='https://vercel.com/joe-burtons-projects'
                      isExternal
                    >
                      <Text>
                        <Icon as={Vercel} width='20px' height='20px' mr='4px' />
                        vercel.com/joe-burtons-projects
                      </Text>
                    </ChakraLink>
                  </Card>
                </li>
                <li>
                  <Card variant='filled' p='1'>
                    <ChakraLink
                      href='https://www.linkedin.com/in/joejamesburton'
                      isExternal
                    >
                      <Text>
                        <Icon
                          as={LinkedIn}
                          width='20px'
                          height='20px'
                          mr='4px'
                        />
                        linkedin.com/in/joejamesburton
                      </Text>
                    </ChakraLink>
                  </Card>
                </li>
              </ul>
              <SimpleGrid columns={1}>
                <Show below='md'>
                  <Divider
                    orientation='horizontal'
                    m='10px 0 15px 0'
                    color='silver'
                    sx={{
                      "@media screen and (min-width: 768px)": {
                        display: "none",
                      },
                    }}
                  />
                </Show>
                <List spacing={3} mb='10px'>
                  <ListItem>
                    <ListIcon as={HiMiniAtSymbol} />
                    <Link href='mailto:joeburton@gmail.com'>
                      joeburton@gmail.com
                    </Link>
                  </ListItem>
                  <ListItem>
                    <ListIcon as={HiMiniDevicePhoneMobile} />
                    <Link href='tel:+447768989321'>+ 44 (0) 7768989321</Link>
                  </ListItem>
                </List>
                <Flex alignItems='flex-end' mt='20px'>
                  <ChakraLink
                    colorScheme='teal'
                    variant='outline'
                    mr='10px'
                    alignItems='center'
                    display='inline-flex'
                    href='/work'
                  >
                    View my work
                    <Icon as={ArrowForwardIcon} m='0 0 0 4px' />
                  </ChakraLink>
                  <ChakraLink
                    colorScheme='teal'
                    variant='outline'
                    alignItems='center'
                    display='inline-flex'
                    href='/contact'
                  >
                    Contact me
                    <Icon as={ArrowForwardIcon} m='0 0 0 4px' />
                  </ChakraLink>
                </Flex>
              </SimpleGrid>
            </SimpleGrid>
          </CardBody>
        </Card>
      </Box>
    </div>
  );
};

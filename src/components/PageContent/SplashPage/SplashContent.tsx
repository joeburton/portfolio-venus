"use client";

import { Link } from "@chakra-ui/next-js";

import {
  Box,
  Card,
  CardBody,
  Link as ChakraLink,
  Divider,
  Icon,
  ListItem,
  SimpleGrid,
  Text,
  UnorderedList,
} from "@chakra-ui/react";

import { ArrowForwardIcon } from "@chakra-ui/icons";
import { HiMiniAtSymbol, HiMiniDevicePhoneMobile } from "react-icons/hi2";
import { GitHubMark, LinkedIn } from "../../CustomIcons";
import styles from "./splash.module.css";

export const SplashContent = () => {
  return (
    <div className={styles.splashPage}>
      <Box maxWidth={"768px"} m='0 auto'>
        <Card variant='elevated'>
          <CardBody>
            <UnorderedList className={styles.experience}>
              <ListItem>
                Over 20 years of industry experience working as a Web Developer.
              </ListItem>
              <ListItem>
                More than 15 years specialising in front-end development.
              </ListItem>
              <ListItem>
                With a broad range of experience working for companies such as:
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
                    <Link href='https://github.com/joeburton' isExternal>
                      <Text>
                        <Icon
                          as={GitHubMark}
                          width='20px'
                          height='20px'
                          mr='4px'
                        />
                        github.com/joeburton
                      </Text>
                    </Link>
                  </Card>
                </li>
                <li>
                  <Card variant='filled' p='1'>
                    <Link
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
                    </Link>
                  </Card>
                </li>
                <li>
                  <Card variant='filled' p='1'>
                    <Link href='/work'>
                      <Text>
                        <Icon
                          as={ArrowForwardIcon}
                          width='20px'
                          height='20px'
                          mr='4px'
                        />
                        View my work
                      </Text>
                    </Link>
                  </Card>
                </li>
              </ul>
              <Divider
                orientation='horizontal'
                m='2px 0 2px 0'
                color='silver'
                sx={{
                  "@media screen and (min-width: 768px)": {
                    display: "none",
                  },
                }}
              />
              <ul className={styles.customList}>
                <li>
                  <Card variant='filled' p='1'>
                    <Link href='mailto:joeburton@gmail.com' isExternal>
                      <Text>
                        <Icon
                          as={HiMiniAtSymbol}
                          width='20px'
                          height='20px'
                          mr='4px'
                        />
                        joeburton@gmail.com
                      </Text>
                    </Link>
                  </Card>
                </li>
                <li>
                  <Card variant='filled' p='1'>
                    <Link href='tel:+447768989321' isExternal>
                      <Text>
                        <Icon
                          as={HiMiniDevicePhoneMobile}
                          width='20px'
                          height='20px'
                          mr='4px'
                        />
                        + 44 (0) 7768989321
                      </Text>
                    </Link>
                  </Card>
                </li>
                <li>
                  <Card variant='filled' p='1'>
                    <Link href='/contact'>
                      <Text>
                        <Icon
                          as={ArrowForwardIcon}
                          width='20px'
                          height='20px'
                          mr='4px'
                        />
                        Contact me
                      </Text>
                    </Link>
                  </Card>
                </li>
              </ul>
            </SimpleGrid>
          </CardBody>
        </Card>
      </Box>
    </div>
  );
};

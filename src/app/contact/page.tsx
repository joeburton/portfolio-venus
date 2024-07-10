import { PageIntro } from "@/components/PageIntro";
import { Box, Card, CardBody } from "@chakra-ui/react";

import { ContactForm } from "@/components/ContactForm";

import styles from "./contact.module.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Joe Burton | Front-End Engineer & Tech Lead",
  description:
    "Get in touch with Joe Burton, an experienced Front-End Developer and Tech Lead. Whether you have questions about projects, collaborations, or opportunities, reach out for a prompt response and expert insight.",
};

export default async function Contact() {
  return (
    <>
      <PageIntro
        pageTitle='Contact'
        subText={<>Please feel free to contact me anytime.</>}
        detail={
          <>
            You can email{" "}
            <a href='mailto:joeburton@gmail.com'>joeburton@gmail.com</a>,
            telephone <a href='tel:+447768989321'>+ 44 (0) 7768989321</a> or use
            the form below.
          </>
        }
      />
      <div className={styles.contact}>
        <Box maxWidth={{ base: "100%", md: "768px" }} m='0 auto'>
          <Card variant='elevated'>
            <CardBody>
              <Box>
                <ContactForm />
              </Box>
            </CardBody>
          </Card>
        </Box>
      </div>
    </>
  );
}

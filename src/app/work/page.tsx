import { DisplayItemInterface } from "@/components/DisplayItem";
import { PageIntro } from "@/components/PageIntro";
import { Projects } from "@/components/Projects";
import { Flex } from "@chakra-ui/react";
import { getWorkProjects } from "@/lib/work";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Joe Burton | Front-End Engineer Projects & Work Experience",
  description:
    "Explore Joe Burton's front-end development journey! Discover projects, skills, and experiences from leading teams at Publicis Sapient and WorldFirst to crafting innovative solutions at GE Power Digital and more. Passionate about React, JavaScript, and building exceptional web applications.",
};

export const revalidate = 3600;

import styles from "./work.module.css";

export default async function Work() {
  const projects: DisplayItemInterface[] = await getWorkProjects();
  return (
    <>
      <PageIntro
        pageTitle="Work"
        subText={
          <>
            Over the years, I&apos;ve gained experience in permanent, contract,
            and freelance roles.
          </>
        }
        detail={
          <>
            For more details, feel free to visit my{" "}
            <a
              href="https://www.linkedin.com/in/joejamesburton"
              target="_blank"
            >
              LinkedIn
            </a>{" "}
            profile.
          </>
        }
      />

      <div className={styles.work}>
        <Flex flexWrap="wrap" maxWidth="1200px" margin="0 auto">
          {projects && <Projects projects={projects} />}
        </Flex>
      </div>
    </>
  );
}

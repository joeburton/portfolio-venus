import { PageIntro } from "@/components/PageIntro";

import { DisplayItem, LogoSize } from "@/components/DisplayItem";
import { generateUniqueId } from "@/utils";
import { Flex } from "@chakra-ui/react";

import { DisplayItemInterface } from "@/components/DisplayItem";

import styles from "../work.module.css";

export async function generateStaticParams() {
  const res = await fetch(`${process.env.BASE_URL}/api/projects`);
  const projects = await res.json();

  return projects.map((project: DisplayItemInterface) => ({
    id: project.id,
  }));
}

async function getPost(id: string): Promise<DisplayItemInterface> {
  const res = await fetch(`${process.env.BASE_URL}/api/projects/${id}`);

  return res.json();
}

export default async function ProjectDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  console.log(params);
  const project = await getPost(params.id);
  return (
    <>
      <PageIntro
        pageTitle='Work'
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
              href='https://www.linkedin.com/in/joejamesburton'
              target='_blank'
            >
              LinkedIn
            </a>{" "}
            profile.
          </>
        }
      />
      <div className={styles.work}>
        <Flex
          flexWrap='wrap'
          maxWidth={{ base: "100%", md: "768px" }}
          margin='0 auto'
        >
          <DisplayItem
            logo={project.logo}
            breakpointWidths={{ base: "100%" }}
            logoSize={project.logoSize as LogoSize}
            role={project.role}
            company={project.company}
            description={project.description}
            skills={project.skills}
            className={project.className}
            links={project.links}
            key={generateUniqueId()}
          />
        </Flex>
      </div>
    </>
  );
}

import { SplashContent } from "@/components/PageContent/SplashPage/SplashContent";
import { PageIntro } from "@/components/PageIntro";

export default function Home() {
  return (
    <>
      <PageIntro
        pageTitle='Welcome'
        subText={
          <>
            My name is <span>Joe Burton</span>, I&apos;m a Web Developer.
          </>
        }
        detail='This is my portfolio and online playground.'
      />
      <SplashContent />
    </>
  );
}

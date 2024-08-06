"use client";

import { Image } from "@chakra-ui/react";

import { engineers } from "@/data/engineers";
import { useRandomArrayItems } from "@/hooks";

export const DisplayRandomImages = () => {
  const [randomItems] = useRandomArrayItems(engineers, 3);
  return (
    <>
      {randomItems instanceof Array &&
        randomItems.map((item: string) => (
          <Image
            src={`/assets/ginger-software-engineer-ai/${item}`}
            alt='Cliché image of a carrier pigeon. This image was generated using AI 🤓 how ironic.'
            key={item}
          />
        ))}
    </>
  );
};

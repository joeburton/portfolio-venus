"use client";

import { useEffect, useState } from "react";

export const useRandomArrayItems = <T,>(items: T[], numberItems: number) => {
  const [randomItems, setRandomItems] = useState<T[]>([]);

  useEffect(() => {
    const getRandomItems = () => {
      const result = [...items]
        .sort(() => Math.random() - 0.5)
        .slice(0, numberItems);
      setRandomItems(result);
    };

    getRandomItems();
  }, [items, numberItems]);

  return [randomItems, setRandomItems];
};

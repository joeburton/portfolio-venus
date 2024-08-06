"use client";

import { useState } from "react";
import { Image } from "@chakra-ui/react";
import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";

import styles from "./SmartCarousel.module.css";

interface Item {
  description: string;
  image: string;
}

interface CarouselInterface {
  items: Item[];
}

const CarouselItem = ({ image, description }: Item) => {
  return (
    <li>
      <Image src={image} alt={description} />
    </li>
  );
};

export const SmartCarousel = ({ items }: CarouselInterface) => {
  const [itemPosition, setItemPosition] = useState<number>(0);

  const previous = () => {
    if (itemPosition === 0) return;
    setItemPosition((prevState) => prevState - 1);
  };

  const next = () => {
    if (itemPosition === items.length - 1) return;
    setItemPosition((prevState) => prevState + 1);
  };

  const moveSlideToNewPos = (slidePos: number) => {
    if (itemPosition === slidePos) return;
    setItemPosition(slidePos);
  };

  return (
    <div data-testid='carousel'>
      <div className={styles.carousel}>
        <div className={styles.left} onClick={previous}>
          <ChevronLeft color='white' size={20} />
        </div>
        <ul
          className={styles.items}
          style={{
            transform: `translateX(-${itemPosition}00%)`,
          }}
        >
          {items.map((item, i) => (
            <CarouselItem {...item} key={i} />
          ))}
        </ul>
        <div className={styles.right} onClick={next}>
          <ChevronRight color='white' size={20} />
        </div>
      </div>
      <ul className={styles.tracker}>
        {items.map((_item, i) => (
          <li
            className={`${itemPosition === i ? styles.green : styles.red}`}
            key={i}
            onClick={() => moveSlideToNewPos(i)}
          ></li>
        ))}
      </ul>
    </div>
  );
};

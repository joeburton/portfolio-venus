import { useState } from "react";
import styles from "./Carousel.module.css";

export const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const numberSlides = 7;

  const previous = () => {
    if (currentIndex === 0) return;
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? numberSlides - 1 : prevIndex - 1
    );
  };

  const next = () => {
    if (currentIndex === numberSlides - 1) return;
    setCurrentIndex((prevIndex) =>
      prevIndex === numberSlides - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <>
      <div className={styles.carousel}>
        <ul
          style={{
            transform: `translateX(-${(100 / numberSlides) * currentIndex}%)`,
          }}
        >
          <li>item 1</li>
          <li>item 2</li>
          <li>item 3</li>
          <li>item 4</li>
          <li>item 5</li>
          <li>item 6</li>
          <li>item 7</li>
        </ul>
      </div>
      <div className={styles.carouselNavigation}>
        <span onClick={previous}> previous </span>
        <span className={styles.divide}> | </span>
        <span onClick={next}> next </span>
      </div>
    </>
  );
};

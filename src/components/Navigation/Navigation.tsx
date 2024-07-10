"use client";

import { Link } from "@chakra-ui/next-js";

import styles from "./Navigation.module.css";

import { Hide, Icon, Image } from "@chakra-ui/react";
import { Home } from "../CustomIcons";

export const Navigation = () => {
  const openLogin = () => {
    console.log("open login ");
  };

  return (
    <nav className={styles.navigation}>
      <Link href='/' className={styles.homeIcon}>
        <Icon as={Home} width='20px' height='20px' mr='4px' />
        <Hide>Home</Hide>
      </Link>
      <ul>
        <li>
          <Link href='/work'>Work</Link>
        </li>
        <li>
          <Link href='/contact'>Contact</Link>
        </li>
      </ul>
      <Image
        className={styles.logo}
        boxSize='50px'
        src='/assets/profile-images/me.jpg'
        alt='Joe Burton'
        onClick={openLogin}
      />
    </nav>
  );
};

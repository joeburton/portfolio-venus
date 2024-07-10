import { Text } from "@chakra-ui/react";

import styles from "./Footer.module.css";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Text fontSize='sm'>© JB</Text>
    </footer>
  );
};

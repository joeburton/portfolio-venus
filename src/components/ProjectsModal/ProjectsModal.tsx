"use client";

import { useState } from "react";
import { Button } from "@chakra-ui/react";

import styles from "./ProjectsModal.module.css";

export const ProjectsModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Projects Modal</h2>
      <Button
        colorScheme="teal"
        type="button"
        variant="outline"
        onClick={() => setIsOpen(true)}
      >
        Open Projects Modal
      </Button>

      {isOpen && (
        <div className={styles.backdrop} onClick={() => setIsOpen(false)}>
          <div
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="projects-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h3 id="projects-modal-title" className={styles.modalTitle}>
                Projects
              </h3>
              <button
                type="button"
                className={styles.closeButton}
                onClick={() => setIsOpen(false)}
                aria-label="Close modal"
              >
                ×
              </button>
            </div>

            <div className={styles.modalBody}>
              <p className={styles.description}>
                This is a basic modal shell you can fill with project details,
                links, or screenshots.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

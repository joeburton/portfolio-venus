"use client"; // Error components must be Client Components

import { useEffect, useState } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [errorMessage, setErrorMessage] = useState<string>();
  useEffect(() => {
    console.log(error.message);
    setErrorMessage(error?.message || "");
  }, [error]);

  return (
    <div>
      <h2>Something went wrong! {errorMessage}</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}

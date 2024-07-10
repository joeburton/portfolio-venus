import { createIcon } from "@chakra-ui/icons";

// using `path`
export const Vercel = createIcon({
  displayName: "Vercel",
  viewBox: "0 0 75 65",
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <path
      aria-label='Vercel Logo'
      fill='var(--geist-foreground)'
      viewBox='0 0 75 65'
      height='22'
      d='M37.59.25l36.95 64H.64l36.95-64z'
    ></path>
  ),
});

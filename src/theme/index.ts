"use client";

import { extendTheme } from "@chakra-ui/react";

export const breakpoints = {
  base: 0,
  sm: 568,
  md: 768,
  lg: 960,
  xl: 1200,
  "2xl": 1536,
};

export default extendTheme({
  breakpoints,
  fonts: {
    body: "Helvetica Neue, Helvetica, Arial, sans-serif",
    heading: "Georgia, serif",
    mono: "Menlo, monospace",
  },
  styles: {
    global: () => ({
      body: {
        background: "#f0f0f0",
      },
    }),
  },
  fontWeights: {
    slim: 300,
    normal: 400,
    medium: 500,
    bold: 700,
  },
});

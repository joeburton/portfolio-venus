import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import { FilterProjects } from "./FilterProjects";
import { DisplayItemInterface } from "../DisplayItem";
import userEvent from "@testing-library/user-event";

const projects: DisplayItemInterface[] = [
  {
    _id: "1",
    logo: "logo1.png",
    logoSize: "medium",
    role: "Front-end Developer",
    company: "Tech Innovations",
    description: "Develops cutting-edge tech solutions.",
    skills: "JavaScript, React",
    className: "project-class",
    links: [{ visual: "link1.png", url: "http://example.com" }],
    breakpointWidths: {
      base: "100%",
      lg: "50%",
      xl: "33.3%",
    },
  },
  {
    _id: "2",
    logo: "logo1.png",
    logoSize: "medium",
    role: "Front-end Developer",
    company: "Smart Innovations",
    description: "Develops cutting-edge tech solutions.",
    skills: "JavaScript, React",
    className: "project-class",
    links: [{ visual: "link1.png", url: "http://example.com" }],
    breakpointWidths: {
      base: "100%",
      lg: "50%",
      xl: "33.3%",
    },
  },
];

describe("FilterProjects", () => {
  it("renders the input field correctly", () => {
    render(
      <ChakraProvider>
        <FilterProjects projects={projects} />
      </ChakraProvider>
    );
    fireEvent.keyDown(document, { key: "x", code: "KeyX" });

    expect(screen.getByPlaceholderText("Filter projects")).toBeInTheDocument();
  });

  it("filters projects based on user input", async () => {
    render(
      <ChakraProvider>
        <FilterProjects projects={projects} />
      </ChakraProvider>
    );

    fireEvent.keyDown(document, { key: "x", code: "KeyX" });

    const input = screen.getByPlaceholderText("Filter projects");
    await userEvent.type(input, "tech");

    expect(screen.getByText("Tech Innovations")).toBeInTheDocument();
    expect(screen.queryByText("Health Plus")).not.toBeInTheDocument();
  });
});

import { render, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ChakraBaseProvider } from "@chakra-ui/react";

import { DisplayItem, LogoSize } from "./DisplayItem";
import { projects } from "../../app/api/projects/projects";

describe("DisplayItem", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should render the DisplayItem component", async () => {
    const project = projects[0];

    render(
      <ChakraBaseProvider>
        <DisplayItem
          breakpointWidths={{ base: "100%", lg: "50%", xl: "33.3%" }}
          logo={project.logo}
          logoSize={project.logoSize as LogoSize}
          role={project.role}
          company={project.company}
          description={project.description}
          skills={project.skills}
          className={project.className}
          links={project.links}
          rowEnd={false}
        />
      </ChakraBaseProvider>
    );

    expect(screen.getByText(/Front-end Lead\/ Manager/)).toBeInTheDocument();
  });

  it("should expand the text area when the Expand > link is clicked", async () => {
    const project = projects[1];

    render(
      <ChakraBaseProvider>
        <DisplayItem
          breakpointWidths={{ base: "100%", lg: "50%", xl: "33.3%" }}
          logo={project.logo}
          logoSize={project.logoSize as LogoSize}
          role={project.role}
          company={project.company}
          description={project.description}
          skills={project.skills}
          className={project.className}
          links={project.links}
          rowEnd={false}
        />
      </ChakraBaseProvider>
    );

    const description = screen.getByTestId("description");
    const toggleText = screen.getByTestId("toggle-text");

    expect(description).toHaveStyle({ height: "70px" });

    userEvent.click(toggleText);

    await waitFor(() => {
      expect(description).toHaveStyle({ height: "100%" });
    });

    expect(toggleText).toHaveTextContent("Collapse");
  });

  it("should render the correct number of skills", () => {
    const project = projects[1];

    render(
      <ChakraBaseProvider>
        <DisplayItem
          breakpointWidths={{ base: "100%", lg: "50%", xl: "33.3%" }}
          logo={project.logo}
          logoSize={project.logoSize as LogoSize}
          role={project.role}
          company={project.company}
          description={project.description}
          skills={project.skills}
          className={project.className}
          links={project.links}
          rowEnd={false}
        />
      </ChakraBaseProvider>
    );

    const listItems = screen.getAllByRole("listitem");
    expect(listItems.length).toEqual(16);
  });
});

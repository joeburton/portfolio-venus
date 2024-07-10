import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ChakraBaseProvider } from "@chakra-ui/react";
import { vi } from "vitest";

import { DisplayItem, LogoSize } from "./DisplayItem";
import { projects } from "../../data/projects";

import * as UtilsModule from "../../utils";

describe("DisplayItem", () => {
  it("should render the DisplayItem component", async () => {
    const project = projects[0];

    const { getByText } = render(
      <ChakraBaseProvider>
        <DisplayItem
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

    expect(getByText(/Front-end Lead\/ Manager/)).toBeInTheDocument();
  });

  it("should expand the text area when the Expand > link is clicked", async () => {
    const project = projects[1];

    const { getByTestId } = render(
      <ChakraBaseProvider>
        <DisplayItem
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

    const description = getByTestId("description");
    const toggleText = getByTestId("toggle-text");

    expect(description).toHaveStyle({ height: "70px" });

    userEvent.click(toggleText);

    await waitFor(() => {
      expect(description).toHaveStyle({ height: "100%" });
    });

    expect(toggleText).toHaveTextContent("Collapse");
  });

  it("should spyOn the utility function generateUniqueId and check the number of times it has been called 🤓", () => {
    const spyOnGenerateUniqueId = vi.spyOn(UtilsModule, "generateUniqueId");

    const project = projects[1];

    render(
      <ChakraBaseProvider>
        <DisplayItem
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

    expect(spyOnGenerateUniqueId).toHaveBeenCalledTimes(17);

    vi.restoreAllMocks();
  });

  it("should mock the utility function generateUniqueId 🤓", () => {
    const mockGenerateUniqueId = vi.fn(() => "234SDF234234");

    vi.spyOn(UtilsModule, "generateUniqueId").mockImplementation(
      mockGenerateUniqueId
    );

    const project = projects[1];
    console.log(project);
    render(
      <ChakraBaseProvider>
        <DisplayItem
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

    expect(mockGenerateUniqueId).toHaveBeenCalled();
    expect(UtilsModule.generateUniqueId).toHaveBeenCalledTimes(17);

    vi.restoreAllMocks();
  });
});

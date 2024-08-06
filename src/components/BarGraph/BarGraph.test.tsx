import { ChakraBaseProvider } from "@chakra-ui/react";
import { render } from "@testing-library/react";

import { BarGraph } from "./BarGraph";

describe("BarGraph", () => {
  it("should render all the bars in the BarGraph component", () => {
    const data = [
      { label: "A", value: 10 },
      { label: "B", value: 20 },
      { label: "C", value: 15 },
      { label: "D", value: 25 },
    ];

    const { getByText } = render(
      <ChakraBaseProvider>
        <BarGraph data={data} />
      </ChakraBaseProvider>
    );

    ["14.29%", "28.57%", "21.43%", "35.71%"].forEach((bar) => {
      expect(getByText(bar)).toBeInTheDocument();
    });
  });
});

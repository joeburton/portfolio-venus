import { ChakraBaseProvider } from "@chakra-ui/react";
import { render } from "@testing-library/react";
import { Footer } from "./Footer";

describe("Footer", () => {
  it("should render the Footer component", () => {
    const { getByText } = render(
      <ChakraBaseProvider>
        <Footer />
      </ChakraBaseProvider>
    );

    expect(getByText(/© JB/)).toBeInTheDocument();
  });
});

import { ChakraBaseProvider } from "@chakra-ui/react";
import { render } from "@testing-library/react";

import { PageIntro } from "./PageIntro";

describe("PageIntro", () => {
  it("should render the PageIntro component", () => {
    const { getByText } = render(
      <ChakraBaseProvider>
        <PageIntro
          pageTitle='hello'
          subText="i'm sub text"
          detail={<>and the details</>}
        />
      </ChakraBaseProvider>
    );

    expect(getByText(/hello/)).toBeInTheDocument();
    expect(getByText(/i'm sub text/)).toBeInTheDocument();
    expect(getByText(/and the details/)).toBeInTheDocument();
  });
});

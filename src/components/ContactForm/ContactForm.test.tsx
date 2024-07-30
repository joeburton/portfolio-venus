import { ChakraBaseProvider } from "@chakra-ui/react";
import { render, screen } from "@testing-library/react";

import userEvent from "@testing-library/user-event";
import { ContactForm } from "./ContactForm";

describe("ContactForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should render the ContactForm", async () => {
    render(
      <ChakraBaseProvider>
        <ContactForm />
      </ChakraBaseProvider>
    );

    await screen.findByLabelText("Name");

    expect(screen.getByText(/Name/)).toBeInTheDocument();
  });
  it("should display validation messages for each field when the form is submitted with empty fields", async () => {
    render(
      <ChakraBaseProvider>
        <ContactForm />
      </ChakraBaseProvider>
    );

    await screen.findByLabelText("Name");

    const submitButton = screen.getByRole("button", { name: "Submit" });

    await userEvent.click(submitButton);

    expect(screen.getByText("Name is required")).toBeInTheDocument();
    expect(screen.getByText("Email is required")).toBeInTheDocument();
    expect(screen.getByText("Phone number is required")).toBeInTheDocument();
    expect(
      screen.getByText("Please provide a short message 😱")
    ).toBeInTheDocument();
  });

  it("should display the correct error message when the form is submitted with an invalid email address", async () => {
    render(
      <ChakraBaseProvider>
        <ContactForm />
      </ChakraBaseProvider>
    );

    await screen.findByLabelText("Name");

    const submitButton = screen.getByRole("button", { name: "Submit" });
    const emailAddress = screen.getByLabelText("Email");

    await userEvent.type(emailAddress, "joeburton!g mail.com");
    await userEvent.click(submitButton);

    expect(emailAddress).toHaveValue("joeburton!g mail.com");
    expect(
      screen.getByText("Please provide a valid email address")
    ).toBeInTheDocument();
  });

  it("should display the correct error message when the form is submitted with an invalid phone number", async () => {
    render(
      <ChakraBaseProvider>
        <ContactForm />
      </ChakraBaseProvider>
    );

    await screen.findByLabelText("Name");

    const submitButton = screen.getByRole("button", { name: "Submit" });
    const phoneNumber = screen.getByLabelText("Phone Number");

    await userEvent.type(phoneNumber, "34234f34");
    await userEvent.click(submitButton);

    expect(
      screen.getByText("Phone number must be digits only")
    ).toBeInTheDocument();
  });
});

import { fireEvent, render, screen } from "@testing-library/react";
import { SignupForm } from "@/components/forms/SignupForm";

describe("SignupForm", () => {
  it("renders inputs and button", () => {
    render(<SignupForm />);
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Sign Up/i })
    ).toBeInTheDocument();
  });

  it("shows validation errors for invalid data", () => {
    render(<SignupForm />);
    fireEvent.click(screen.getByText(/Sign Up/i));
    expect(screen.getByText(/Name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Invalid email/i)).toBeInTheDocument();
  });

  it("calls onSubmit when valid", () => {
    const onSubmit = jest.fn();
    render(<SignupForm onSubmit={onSubmit} />);

    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: "Jeff" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/^Password/i), {
      target: { value: "123456" },
    });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), {
      target: { value: "123456" },
    });

    fireEvent.submit(screen.getByTestId("signup-form"));
    expect(onSubmit).toHaveBeenCalledWith({
      name: "Jeff",
      email: "test@example.com",
      password: "123456",
      confirmPassword: "123456",
    });
  });
});

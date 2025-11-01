import { render, screen } from "@testing-library/react";
import { Badge } from "@/components/ui/Badge";

describe("Badge", () => {
  it("renders the label correctly", () => {
    render(<Badge label="Test Badge" />);
    expect(screen.getByText("Test Badge")).toBeInTheDocument();
  });

  it("applies the correct variant class", () => {
    const { getByTestId } = render(<Badge label="Error" variant="error" />);
    expect(getByTestId("badge")).toHaveClass("bg-red-100");
  });

  it("supports different sizes", () => {
    const { getByTestId, rerender } = render(<Badge label="Small" size="sm" />);
    expect(getByTestId("badge")).toHaveClass("text-xs");

    rerender(<Badge label="Large" size="lg" />);
    expect(getByTestId("badge")).toHaveClass("text-base");
  });
});

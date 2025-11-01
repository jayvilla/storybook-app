import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "@/components/ui/Button";

describe("Button", () => {
  it("renders with correct text", () => {
    render(<Button>Click</Button>);
    expect(screen.getByText("Click")).toBeInTheDocument();
  });

  it("fires onClick", () => {
    const mockFn = jest.fn();
    render(<Button onClick={mockFn}>Click</Button>);
    fireEvent.click(screen.getByText("Click"));
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});

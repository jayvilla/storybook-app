import { render, screen } from "@testing-library/react";
import { Card } from "@/components/ui/Card";

describe("Card", () => {
  it("renders title and footer", () => {
    render(
      <Card title="Title" footer="Footer">
        Content
      </Card>
    );
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });

  it("renders children content", () => {
    render(<Card>Child content</Card>);
    expect(screen.getByText("Child content")).toBeInTheDocument();
  });

  it("applies hoverable styles", () => {
    const { getByTestId } = render(<Card hoverable>Hoverable</Card>);
    expect(getByTestId("card")).toHaveClass("hover:shadow-md");
  });
});

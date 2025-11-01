import { render, screen } from "@testing-library/react";
import { SplitPane } from "@/components/layout/SplitPane";

describe("SplitPane", () => {
  it("renders left and right content", () => {
    render(<SplitPane left={<div>Left</div>} right={<div>Right</div>} />);
    expect(screen.getByText("Left")).toBeInTheDocument();
    expect(screen.getByText("Right")).toBeInTheDocument();
  });

  it("applies ratio classes for 1/3 at md breakpoint", () => {
    const { getByTestId } = render(
      <SplitPane ratio="1/3" left={<div>L</div>} right={<div>R</div>} />
    );
    // We can’t evaluate media queries in JSDOM, but we can at least assert
    // the class names that Tailwind will interpret in the browser.
    expect(getByTestId("splitpane-left").className).toMatch(/md:basis-1\/3/);
    expect(getByTestId("splitpane-right").className).toMatch(/md:basis-2\/3/);
  });

  it("uses md breakpoint by default and applies gutter", () => {
    const { getByTestId } = render(
      <SplitPane gutter="lg" left={<div>L</div>} right={<div>R</div>} />
    );
    expect(getByTestId("splitpane").className).toMatch(/md:flex-row/);
    expect(getByTestId("splitpane").className).toMatch(/gap-8/); // lg gutter
  });
});

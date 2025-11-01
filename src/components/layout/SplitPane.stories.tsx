import type { Meta, StoryObj } from "@storybook/react";
import { SplitPane } from "./SplitPane";

const Box = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
    {children}
  </div>
);

const meta: Meta<typeof SplitPane> = {
  title: "Layout/SplitPane",
  component: SplitPane,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
**SplitPane** arranges content in a responsive 2-column layout that stacks on smaller screens.
Configure the column ratio, gutter, alignment, and the breakpoint where stacking stops.
        `,
      },
    },
  },
  argTypes: {
    ratio: {
      control: "radio",
      options: ["1/2", "1/3", "2/3"],
      description: "Column width ratio at/above the breakpoint.",
    },
    gutter: {
      control: "radio",
      options: ["none", "sm", "md", "lg"],
      description: "Space between columns.",
    },
    align: {
      control: "radio",
      options: ["start", "center", "stretch"],
      description: "Vertical alignment (at/above breakpoint).",
    },
    stackAt: {
      control: "radio",
      options: ["sm", "md"],
      description: "Stacks below this breakpoint.",
    },
  },
};
export default meta;

type Story = StoryObj<typeof SplitPane>;

export const Default: Story = {
  args: {
    ratio: "1/2",
    gutter: "md",
    align: "stretch",
    stackAt: "md",
    left: <Box>Left content (1/2)</Box>,
    right: <Box>Right content (1/2)</Box>,
  },
};

export const OneThirdTwoThirds: Story = {
  args: {
    ratio: "1/3",
    stackAt: "md",
    left: <Box>Left (1/3)</Box>,
    right: <Box>Right (2/3)</Box>,
  },
};

export const TwoThirdsOneThird: Story = {
  args: {
    ratio: "2/3",
    stackAt: "md",
    left: <Box>Left (2/3)</Box>,
    right: <Box>Right (1/3)</Box>,
  },
};

export const StackBelowSmall: Story = {
  args: {
    ratio: "1/2",
    stackAt: "sm",
    left: <Box>Stacks below `sm` breakpoint</Box>,
    right: <Box>Try resizing the canvas</Box>,
  },
};

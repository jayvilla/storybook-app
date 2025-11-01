import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./Card";

const meta: Meta<typeof Card> = {
  title: "UI/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A **Card** is a flexible container used to group related information or content.  
It supports a title, children (content area), and an optional footer.  
Cards can be made *hoverable* for better interactivity.

### Example
\`\`\`tsx
<Card title="User Info" footer="Last updated 2h ago">
  <p>This card contains arbitrary content.</p>
</Card>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    title: { control: "text", description: "Optional card title." },
    footer: { control: "text", description: "Optional footer section." },
    hoverable: {
      control: "boolean",
      description: "Adds a hover shadow and slight lift effect.",
    },
  },
};
export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    title: "Default Card",
    children: "This is a simple card with default styling.",
    footer: "Footer content",
  },
};

export const Hoverable: Story = {
  args: {
    title: "Hoverable Card",
    children: "Hover me to see the shadow effect!",
    hoverable: true,
    footer: "Hover interaction demo",
  },
};

export const WithoutTitle: Story = {
  args: {
    children: "This card has no title or footer, just content.",
  },
};

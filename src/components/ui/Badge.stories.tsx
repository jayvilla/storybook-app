import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "UI/Badge",
  component: Badge,
  parameters: {
    docs: {
      description: {
        component: `
The **Badge** component is used to display concise, contextually relevant information such as a status, label, or category.

### Variants
- \`info\` — neutral informational context  
- \`success\` — positive feedback  
- \`warning\` — cautionary alert  
- \`error\` — negative state

### Example
\`\`\`tsx
<Badge label="New" variant="info" />
<Badge label="Error" variant="error" size="lg" />
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["info", "success", "warning", "error"],
      description: "Defines the color theme of the badge.",
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "Controls the padding and font size.",
    },
  },
};
export default meta;

type Story = StoryObj<typeof Badge>;

export const Info: Story = {
  args: { label: "Info Badge", variant: "info" },
};

export const Success: Story = {
  args: { label: "Success Badge", variant: "success" },
};

export const Warning: Story = {
  args: { label: "Warning Badge", variant: "warning" },
};

export const Error: Story = {
  args: { label: "Error Badge", variant: "error" },
};

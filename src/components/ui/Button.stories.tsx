import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  parameters: {
    docs: {
      description: {
        component: `
A **Button** triggers an action or event.  
Supports both primary and secondary variants with consistent design tokens.

### Usage
\`\`\`tsx
<Button variant="primary">Click Me</Button>
<Button variant="secondary">Cancel</Button>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary"],
      description: "Defines the visual style of the button.",
    },
    onClick: {
      action: "clicked",
      description: "Event handler triggered when the button is pressed.",
    },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: "Primary Button",
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary Button",
    variant: "secondary",
  },
};

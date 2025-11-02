import type { Meta, StoryObj } from "@storybook/react";
import { SignupForm } from "./SignupForm";

const meta: Meta<typeof SignupForm> = {
  title: "Forms/SignupForm",
  component: SignupForm,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A reusable **SignupForm** component with built-in client-side validation.
It collects a user's name, email, password, and password confirmation.
`,
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof SignupForm>;

export const Default: Story = {
  args: {
    onSubmit: (values) => alert(JSON.stringify(values, null, 2)),
  },
};

import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
};
export default meta;

export const Primary: StoryObj<typeof Button> = {
  args: {
    children: "Click Me",
    variant: "primary",
  },
};

export const Secondary: StoryObj<typeof Button> = {
  args: {
    children: "Cancel",
    variant: "secondary",
  },
};

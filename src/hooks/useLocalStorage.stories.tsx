import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { useLocalStorage } from "./useLocalStorage";

const meta: Meta = {
  title: "Hooks/useLocalStorage",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A React hook that persists state to \`localStorage\` with JSON serialization and cross-tab sync.
`,
      },
    },
  },
};
export default meta;

type Story = StoryObj;

export const Demo: Story = {
  render: () => {
    const DemoComp = () => {
      const { value, set, remove } = useLocalStorage<string>("demo:name", "");
      return (
        <div style={{ display: "grid", gap: 8, maxWidth: 360 }}>
          <label>
            Name:
            <input
              value={value}
              onChange={(e) => set(e.target.value)}
              placeholder="Type to persist…"
              style={{
                marginLeft: 8,
                padding: 6,
                border: "1px solid #ddd",
                borderRadius: 6,
              }}
            />
          </label>
          <small>
            Stored under <code>localStorage["demo:name"]</code>
          </small>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => set("")}>Clear</button>
            <button onClick={remove}>Remove Key</button>
          </div>
        </div>
      );
    };
    return <DemoComp />;
  },
};

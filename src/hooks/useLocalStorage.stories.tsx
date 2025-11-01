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
A React hook that persists state to \`localStorage\`, supports JSON values, and syncs across tabs.

**Features**
- SSR-safe initial value
- JSON serialize/parse by default
- Cross-tab synchronization via \`storage\` events
- Imperative \`set\` and \`remove\`

**Usage**
\`\`\`tsx
const { value, set, remove } = useLocalStorage<string>("username", "");
\`\`\`
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

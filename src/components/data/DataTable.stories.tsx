import type { Meta, StoryObj } from "@storybook/react";
import { DataTable } from "./DataTable";

type User = { id: number; name: string; email: string; age: number };

const sampleData: User[] = [
  { id: 1, name: "Jeff Villarino", email: "jeff@example.com", age: 32 },
  { id: 2, name: "Jane Doe", email: "jane@example.com", age: 28 },
  { id: 3, name: "Matt Lane", email: "matt@example.com", age: 42 },
  { id: 4, name: "Sara Kim", email: "sara@example.com", age: 36 },
];

const meta: Meta<typeof DataTable<User>> = {
  title: "Data/DataTable",
  component: DataTable,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A **DataTable** component for displaying tabular data with optional sorting and custom cell rendering.

### Features
- Sortable columns (click to toggle ascending/descending)
- Zebra striping
- Generic type-safe props
        `,
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof DataTable<User>>;

export const Default: Story = {
  args: {
    columns: [
      { key: "id", label: "ID", sortable: true },
      { key: "name", label: "Name", sortable: true },
      { key: "email", label: "Email" },
      { key: "age", label: "Age", sortable: true },
    ],
    data: sampleData,
    initialSortKey: "name",
  },
};

export const CustomCell: Story = {
  args: {
    columns: [
      { key: "name", label: "Name" },
      {
        key: "email",
        label: "Email (mailto)",
        render: (u) => (
          <a href={`mailto:${u.email}`} className="text-blue-600 underline">
            {u.email}
          </a>
        ),
      },
      { key: "age", label: "Age", sortable: true },
    ],
    data: sampleData,
  },
};

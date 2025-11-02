import { render, screen, fireEvent } from "@testing-library/react";
import { DataTable } from "@/components/data/DataTable";

type User = { id: number; name: string; age: number };

const data: User[] = [
  { id: 1, name: "Jeff", age: 32 },
  { id: 2, name: "Jane", age: 28 },
  { id: 3, name: "Matt", age: 42 },
];

describe("DataTable", () => {
  it("renders headers and rows", () => {
    render(
      <DataTable
        columns={[
          { key: "id", label: "ID" },
          { key: "name", label: "Name" },
        ]}
        data={data}
      />
    );
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getAllByTestId("datatable-row")).toHaveLength(3);
  });

  it("sorts ascending then descending on column click", () => {
    render(
      <DataTable
        columns={[
          { key: "age", label: "Age", sortable: true },
          { key: "name", label: "Name" },
        ]}
        data={data}
      />
    );

    const header = screen.getByText("Age");
    fireEvent.click(header); // sort ascending
    let rows = screen.getAllByTestId("datatable-row");
    expect(rows[0]).toHaveTextContent("28");

    fireEvent.click(header); // sort descending
    rows = screen.getAllByTestId("datatable-row");
    expect(rows[0]).toHaveTextContent("42");
  });
});

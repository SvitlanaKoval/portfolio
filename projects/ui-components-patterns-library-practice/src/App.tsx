import { useState } from "react";
import { DataTable } from "./components/table/DataTable";
import { Modal } from "./components/modal/Modal";
import { TextField } from "./components/form/TextField";

const mockData = [
  { id: 1, name: "John Doe", email: "john@test.com" },
  { id: 2, name: "Jane Smith", email: "jane@test.com" },
];

function App() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  return (
    <div style={{ padding: "20px" }}>
      <h1>UI Components Library</h1>

      {/* TABLE */}
      <h2>Table</h2>
      <DataTable
        title="Users"
        rows={mockData}
        columns={[
          { key: "id", label: "ID" },
          { key: "name", label: "Name" },
          { key: "email", label: "Email" },
        ]}
      />

      <h2>Modal</h2>
      <button onClick={() => setOpen(true)}>Open Modal</button>

      <Modal
        isOpen={open}
        title="Reusable Modal"
        onClose={() => setOpen(false)}
      >
        <p>This is reusable modal</p>
      </Modal>

      {/* FORM */}
      <h2>Form</h2>
      <TextField
        label="Name"
        name="name"
        value={name}
        onChange={setName}
        placeholder="Enter name"
      />
    </div>
  );
}

export default App;
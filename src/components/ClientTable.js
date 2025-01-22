import React, { useState } from "react";

const ClientTable = ({ records, allRecords, setRecords }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [editingRecord, setEditingRecord] = useState(null);
  const [editEmail, setEditEmail] = useState("");

  const handleDelete = (id) => {
    const updatedRecords = allRecords.filter((record) => record.id !== id);
    setRecords(updatedRecords);
  };

  const handleEdit = (record) => {
    setEditingRecord(record);
    setEditEmail(record.email);
  };

  const handleUpdate = () => {
    if (
      allRecords.some(
        (record) => record.email === editEmail && record.id !== editingRecord.id
      )
    ) {
      alert("Email address must be unique");
      return;
    }

    const updatedRecords = allRecords.map((record) =>
      record.id === editingRecord.id ? { ...record, email: editEmail } : record
    );

    setRecords(updatedRecords);
    setEditingRecord(null);
  };

  const filteredRecords = allRecords.filter(
    (record) =>
      record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.id.toString().includes(searchTerm)
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search by ID, Name, or Email"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {editingRecord ? (
        <div>
          <input
            type="email"
            value={editEmail}
            onChange={(e) => setEditEmail(e.target.value)}
          />
          <button onClick={handleUpdate}>Update</button>
          <button onClick={() => setEditingRecord(null)}>Cancel</button>
        </div>
      ) : null}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td>{record.id}</td>
              <td>{record.name}</td>
              <td>{record.email}</td>
              <td>
                <button onClick={() => handleEdit(record)}>Edit</button>
                <button onClick={() => handleDelete(record.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientTable;

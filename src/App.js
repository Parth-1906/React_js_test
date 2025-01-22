import React, { useState } from "react";
import "./App.css";
import ClientTable from "./components/ClientTable";
import UploadButton from "./components/UploadButton";

const App = () => {
  const [records, setRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  const handleUpload = (newRecords) => {
    const updatedRecords = [...records, ...newRecords];
    const uniqueRecords = [];
    const emailSet = new Set();

    updatedRecords.forEach((record) => {
      if (!emailSet.has(record.email)) {
        emailSet.add(record.email);
        uniqueRecords.push(record);
      }
    });

    setRecords(uniqueRecords);
    setCurrentPage(1);
  };

  const handleUpdateRecords = (updatedRecords) => {
    setRecords(updatedRecords);

    const totalPages = Math.ceil(updatedRecords.length / recordsPerPage);
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  };

  const paginate = (records, currentPage, recordsPerPage) => {
    const startIndex = (currentPage - 1) * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;
    return records.slice(startIndex, endIndex);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const currentRecords = paginate(records, currentPage, recordsPerPage);
  const totalPages = Math.ceil(records.length / recordsPerPage);

  return (
    <div className="App">
      <h1 className="main-container">Client Records Management</h1>
      <UploadButton onUpload={handleUpload} />
      <ClientTable
        records={currentRecords}
        allRecords={records}
        setRecords={handleUpdateRecords}
      />

      {records.length > 0 && (
        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default App;

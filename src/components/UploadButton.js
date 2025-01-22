import React, { useState } from "react";

const UploadButton = ({ onUpload }) => {
  const [error, setError] = useState("");

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/json") {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const data = JSON.parse(reader.result);
          onUpload(data);
        } catch (err) {
          setError("Invalid JSON file");
        }
      };
      reader.readAsText(file);
    } else {
      setError("Please upload a valid JSON file");
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export default UploadButton;

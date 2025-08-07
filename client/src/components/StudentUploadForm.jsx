import React, { useState } from 'react';
import axios from 'axios';

export default function StudentUploadForm() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return setStatus('⚠️ Please select a file.');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:5000/api/upload/upload-students', formData);
      setStatus(res.data.message);
    } catch (err) {
      console.error(err);
      setStatus('❌ Upload failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded space-y-4">
      <h2 className="font-semibold text-lg">Upload Students from Excel</h2>

      <input
        type="file"
        accept=".xlsx"
        onChange={(e) => setFile(e.target.files[0])}
        className="w-full p-2 border"
      />

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Upload
      </button>

      {status && <p>{status}</p>}
    </form>
  );
}

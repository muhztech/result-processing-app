import React, { useEffect, useState } from 'react';
import { useRole } from '../context/RoleContext';

export default function UpdateResultForm() {
  const [results, setResults] = useState([]);
  const [selectedResultId, setSelectedResultId] = useState('');
  const [ca, setCa] = useState('');
  const [exam, setExam] = useState('');
  const [semester, setSemester] = useState('');
  const [message, setMessage] = useState('');
  const { role } = useRole();

  useEffect(() => {
    fetch('http://localhost:5000/api/results')
      .then(res => res.json())
      .then(data => setResults(data))
      .catch(() => setMessage('Failed to fetch results'));
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (ca > 30) return setMessage('CA cannot exceed 30');
    if (exam > 70) return setMessage('Exam cannot exceed 70');

    const response = await fetch(`http://localhost:5000/api/results/${selectedResultId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ca: Number(ca),
        exam: Number(exam),
        semester: Number(semester), // ✅ include semester
        role,
      }),
    });

    const result = await response.json();
    if (result.error) {
      setMessage(result.error);
    } else {
      setMessage('Result updated successfully');
      setCa('');
      setExam('');
      setSemester('');
      setSelectedResultId('');
    }
  };

  const handleResultSelection = (e) => {
    const id = e.target.value;
    setSelectedResultId(id);
    const selected = results.find(r => r.id === Number(id));
    if (selected) {
      setCa(selected.ca);
      setExam(selected.exam);
      setSemester(selected.semester);
    }
  };

  return (
    <form onSubmit={handleUpdate} className="space-y-4 p-4 bg-gray-100 rounded shadow mt-4">
      <h2 className="text-lg font-semibold">Update Student Result</h2>

      <select
        value={selectedResultId}
        onChange={handleResultSelection}
        required
        className="w-full p-2 border"
      >
        <option value="">Select Result</option>
        {results.map((r) => (
          <option key={r.id} value={r.id}>
            {r.student?.name} - {r.subject} (Sem {r.semester})
          </option>
        ))}
      </select>

      <input
        type="number"
        value={ca}
        onChange={(e) => setCa(e.target.value)}
        placeholder="CA (Max 30)"
        className="w-full p-2 border"
        required
      />

      <input
        type="number"
        value={exam}
        onChange={(e) => setExam(e.target.value)}
        placeholder="Exam (Max 70)"
        className="w-full p-2 border"
        required
      />

      <select
        value={semester}
        onChange={(e) => setSemester(e.target.value)}
        className="w-full p-2 border"
        disabled={role === 'staff'} // 👈 restrict update if staff
      >
        <option value="">Select Semester</option>
        <option value="1">1st</option>
        <option value="2">2nd</option>
        <option value="3">3rd</option>
      </select>

      <button type="submit" className="bg-yellow-600 text-white px-4 py-2 rounded">
        Update Result
      </button>

      {message && <p className="text-red-600">{message}</p>}
    </form>
  );
}

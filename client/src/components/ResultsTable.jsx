// ResultsTable.jsx
import React, { useEffect, useState } from 'react';

export default function ResultsTable() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/students')
      .then(res => res.json())
      .then(data => setStudents(data));
  }, []);

  const fetchResults = (regNumber) => {
    fetch(`http://localhost:5000/api/results/${regNumber}`)
      .then(res => res.json())
      .then(data => setResults(data));
  };

  const handleChange = (e) => {
    const reg = e.target.value;
    setSelectedStudent(reg);
    if (reg) fetchResults(reg);
    else setResults([]);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Student Results</h2>

      <select
        value={selectedStudent}
        onChange={handleChange}
        className="w-full p-2 border mb-4"
      >
        <option value="">Select Student</option>
        {students.map((s) => (
          <option key={s.id} value={s.regNumber}>
            {s.name} ({s.regNumber})
          </option>
        ))}
      </select>

      {results.length > 0 ? (
        <table className="w-full border table-auto">
          <thead>
            <tr>
              <th className="border p-2">Subject</th>
              <th className="border p-2">CA</th>
              <th className="border p-2">Exam</th>
              <th className="border p-2">Total</th>
              <th className="border p-2">Grade</th>
              <th className="border p-2">Remark</th>
              <th className="border p-2">Semester</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r, idx) => (
              <tr key={idx}>
                <td className="border p-2">{r.subject}</td>
                <td className="border p-2">{r.ca}</td>
                <td className="border p-2">{r.exam}</td>
                <td className="border p-2">{r.total}</td>
                <td className="border p-2">{r.grade}</td>
                <td className="border p-2">{r.remark}</td>
                <td className="border p-2">{r.semester}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500">No results found</p>
      )}
    </div>
  );
}

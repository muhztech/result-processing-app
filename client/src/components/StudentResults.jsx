// src/components/StudentResults.jsx
import React, { useEffect, useState } from 'react';
import { useRole } from '../context/RoleContext';

export default function StudentResults() {
  const [students, setStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [results, setResults] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const { role } = useRole();

  useEffect(() => {
    fetch('http://localhost:5000/api/students')
      .then((res) => res.json())
      .then(setStudents);
  }, []);

  useEffect(() => {
    if (selectedStudentId) {
      fetch(`http://localhost:5000/api/results`)
        .then((res) => res.json())
        .then((data) => {
          const filtered = data.filter(
            (result) => result.studentId === Number(selectedStudentId)
          );
          setResults(filtered);
        });
    }
  }, [selectedStudentId]);

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  const handleDelete = async () => {
    if (role !== 'admin') {
      alert('Only admin can delete results');
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/results/${deleteId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setResults(results.filter((r) => r.id !== deleteId));
        setShowConfirm(false);
      } else {
        alert('Failed to delete result');
      }
    } catch (err) {
      alert('Error deleting result');
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold">View Student Results</h2>

      <select
        value={selectedStudentId}
        onChange={(e) => setSelectedStudentId(e.target.value)}
        className="w-full p-2 border mt-2 mb-4"
      >
        <option value="">Select Student</option>
        {students.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name} ({s.regNumber})
          </option>
        ))}
      </select>

      {selectedStudentId && results.length === 0 && (
        <p>No results found for this student.</p>
      )}

      {results.length > 0 && (
        <table className="w-full border mt-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Subject</th>
              <th className="p-2 border">CA</th>
              <th className="p-2 border">Exam</th>
              <th className="p-2 border">Total</th>
              <th className="p-2 border">Grade</th>
              <th className="p-2 border">Remark</th>
              <th className="p-2 border">Semester</th>
              {role === 'admin' && <th className="p-2 border">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {results.map((r) => (
              <tr key={r.id}>
                <td className="p-2 border">{r.subject}</td>
                <td className="p-2 border">{r.ca}</td>
                <td className="p-2 border">{r.exam}</td>
                <td className="p-2 border">{r.total}</td>
                <td className="p-2 border">{r.grade}</td>
                <td className="p-2 border">{r.remark}</td>
                <td className="p-2 border">{r.semester}</td>
                {role === 'admin' && (
                  <td className="p-2 border text-center">
                    <button
                      onClick={() => confirmDelete(r.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showConfirm && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete this result?</p>
            <div className="mt-4 space-x-4">
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

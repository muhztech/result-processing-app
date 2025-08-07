// src/components/ResultForm.jsx
import React, { useState, useEffect } from 'react';
import { useRole } from '../context/RoleContext';

export default function ResultForm() {
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [studentId, setStudentId] = useState('');
  const [subject, setSubject] = useState('');
  const [ca, setCa] = useState('');
  const [exam, setExam] = useState('');
  const [semester, setSemester] = useState('');
  const [message, setMessage] = useState('');
  const { role } = useRole();

  useEffect(() => {
    fetch('http://localhost:5000/api/students')
      .then(res => res.json())
      .then(setStudents)
      .catch(() => setMessage('Failed to load students'));

    fetch('http://localhost:5000/api/subjects')
      .then(res => res.json())
      .then(setSubjects)
      .catch(() => setMessage('Failed to load subjects'));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (ca > 30) return setMessage('CA cannot exceed 30');
    if (exam > 70) return setMessage('Exam cannot exceed 70');

    try {
      const res = await fetch('http://localhost:5000/api/results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: Number(studentId),
          subject,
          ca: Number(ca),
          exam: Number(exam),
          semester: Number(semester),
          role,
        }),
      });

      const data = await res.json();

      if (data.error) {
        setMessage(data.error);
      } else {
        setMessage('✅ Result submitted successfully');
        setStudentId('');
        setSubject('');
        setCa('');
        setExam('');
        setSemester('');
      }
    } catch (err) {
      setMessage('Failed to submit result');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold">Enter New Result</h2>

      <select
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
        required
        className="w-full p-2 border"
      >
        <option value="">Select Student</option>
        {students.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name} ({s.regNumber})
          </option>
        ))}
      </select>

      <select
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        required
        className="w-full p-2 border"
      >
        <option value="">Select Subject</option>
        {subjects.map((s) => (
          <option key={s.id} value={s.name}>
            {s.name}
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

      <input
        type="number"
        value={semester}
        onChange={(e) => setSemester(e.target.value)}
        placeholder="Semester (1, 2, etc)"
        className="w-full p-2 border"
        required
      />

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Submit Result
      </button>

      {message && <p className="text-red-600">{message}</p>}
    </form>
  );
}

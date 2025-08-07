import React, { useState } from 'react';
import axios from 'axios';

function StudentForm() {
  const [name, setName] = useState('');
  const [regNumber, setRegNumber] = useState('');
  const [level, setLevel] = useState('ND1');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await axios.post('http://localhost:5000/api/students', {
        name,
        regNumber,
        level,
      });

      setMessage('✅ Student added successfully');
      setName('');
      setRegNumber('');
      setLevel('ND1');
    } catch (err) {
      setMessage('❌ Error adding student');
      console.error(err);
    }
  };

  return (
    <div className="my-4">
      <h2 className="text-lg font-semibold mb-2">Add Student</h2>
      {message && <p className="mb-2">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-2">
        <div>
          <input
            type="text"
            placeholder="Matric Number"
            value={regNumber}
            onChange={(e) => setRegNumber(e.target.value)}
            required
            className="border p-2 w-full"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border p-2 w-full"
          />
        </div>
        <div>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="border p-2 w-full"
          >
            <option value="ND1">ND1</option>
            <option value="ND2">ND2</option>
            <option value="HND1">HND1</option>
            <option value="HND2">HND2</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2">
          Add Student
        </button>
      </form>
    </div>
  );
}

export default StudentForm;

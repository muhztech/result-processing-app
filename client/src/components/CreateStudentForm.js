import { useState } from 'react';
import { createStudent } from '../api/studentAPI';

export default function CreateStudentForm() {
  const [formData, setFormData] = useState({
    name: '',
    regNumber: '',
    level: 'ND1',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await createStudent(formData);

    if (result.error) {
      setMessage(`❌ ${result.error}`);
    } else {
      setMessage('✅ Student created successfully!');
      setFormData({ name: '', regNumber: '', level: 'ND1' });
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '1rem', border: '1px solid #ccc', marginTop: '1rem' }}>
      <h3>Create Student</h3>
      <input
        type="text"
        name="name"
        placeholder="Student Name"
        value={formData.name}
        onChange={handleChange}
        required
        style={{ display: 'block', marginBottom: '1rem', width: '100%', padding: '0.5rem' }}
      />
      <input
        type="text"
        name="regNumber"
        placeholder="Registration Number"
        value={formData.regNumber}
        onChange={handleChange}
        required
        style={{ display: 'block', marginBottom: '1rem', width: '100%', padding: '0.5rem' }}
      />
      <select
        name="level"
        value={formData.level}
        onChange={handleChange}
        style={{ display: 'block', marginBottom: '1rem', width: '100%', padding: '0.5rem' }}
      >
        <option value="ND1">ND1</option>
        <option value="ND2">ND2</option>
        <option value="HND1">HND1</option>
        <option value="HND2">HND2</option>
      </select>
      <button type="submit" style={{ padding: '0.5rem 1rem' }}>Create Student</button>
      {message && <p style={{ marginTop: '1rem' }}>{message}</p>}
    </form>
  );
}

// src/components/LoginForm.jsx
import React, { useState } from 'react';
import { useRole } from '../context/RoleContext';

export default function LoginForm() {
  const [name, setName] = useState('');
  const [selectedRole, setSelectedRole] = useState('staff');
  const { setRole } = useRole();

  const handleLogin = (e) => {
    e.preventDefault();
    if (name.trim()) {
      setRole(selectedRole.toLowerCase());
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4 bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold">Login</h2>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
        required
        className="w-full p-2 border"
      />

      <select
        value={selectedRole}
        onChange={(e) => setSelectedRole(e.target.value)}
        className="w-full p-2 border"
      >
        <option value="admin">Admin</option>
        <option value="exam_officer">Exam Officer</option>
        <option value="hod">HOD</option>
        <option value="staff">Staff</option>
      </select>

      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        Login
      </button>
    </form>
  );
}

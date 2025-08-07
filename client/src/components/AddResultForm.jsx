import { useState } from 'react';
import { addResult } from '../api/resultAPI';

export default function AddResultForm() {
  const [regNumber, setRegNumber] = useState('');
  const [subject, setSubject] = useState('');
  const [score, setScore] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await addResult({ regNumber, subject, score: parseInt(score) });
    if (result.error) {
      setMessage(result.error);
    } else {
      setMessage('Result added successfully!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <input
        type="text"
        placeholder="Registration Number"
        value={regNumber}
        onChange={(e) => setRegNumber(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Score"
        value={score}
        onChange={(e) => setScore(e.target.value)}
        required
      />
      <button type="submit">Add Result</button>
      {message && <p>{message}</p>}
    </form>
  );
}

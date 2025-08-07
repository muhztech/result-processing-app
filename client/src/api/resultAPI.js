const API_URL = 'http://localhost:5000/api/results';

export const addResult = async (result) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(result),
  });
  return res.json();
};

export const getResults = async (regNumber) => {
  const res = await fetch(`${API_URL}/${regNumber}`);
  return res.json();
};

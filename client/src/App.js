import React from 'react';
import ResultForm from './components/ResultForm';
import StudentResults from './components/StudentResults';
import UpdateResultForm from './components/UpdateResultForm';
import LoginForm from './components/LoginForm';
import StudentForm from './components/StudentForm'; // ✅ Import StudentForm
import { RoleProvider, useRole } from './context/RoleContext';

function MainContent() {
  const { role } = useRole();

  if (!role) return <LoginForm />;

  return (
    <div className="App p-4">
      <h1 className="text-2xl font-bold mb-4">Result Processing System</h1>
      <p className="mb-2">Logged in as <strong>{role}</strong></p>

      <StudentForm /> {/* ✅ Manual Student Entry Form */}
      <ResultForm />
      <UpdateResultForm />

      <hr className="my-6" />
      <StudentResults />
    </div>
  );
}

function App() {
  return (
    <RoleProvider>
      <MainContent />
    </RoleProvider>
  );
}

export default App;

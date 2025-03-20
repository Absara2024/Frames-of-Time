import React, { useState } from 'react';
import axios from 'axios';

function RegisterUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [graduateYear, setGraduateYear] = useState('');
  const [comment, setComment] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      name,
      email,
      schoolName,
      graduateYear,
      comment,
    };

    axios.post('http://localhost:3025/user', newUser)
      .then((response) => {
        alert('User registered successfully');
      })
      .catch((error) => {
        setErrorMessage('There was an error registering the user!');
        console.error('There was an error registering the user!', error);
      });
  };

  return (
    <div>
      <h1>Register User</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>School Name:</label>
          <input type="text" value={schoolName} onChange={(e) => setSchoolName(e.target.value)} required />
        </div>
        <div>
          <label>Graduate Year:</label>
          <input type="text" value={graduateYear} onChange={(e) => setGraduateYear(e.target.value)} required />
        </div>
        <div>
          <label>Comment:</label>
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} required></textarea>
        </div>
        {errorMessage && <div className="error">{errorMessage}</div>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterUser;

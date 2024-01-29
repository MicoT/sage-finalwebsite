// client/src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [inputs, setInputs] = useState({ username: '', email: '', password: '' });

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', inputs);
      console.log(response.data);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" value={inputs.username} onChange={handleChange} />
      <input name="email" value={inputs.email} onChange={handleChange} />
      <input name="password" type="password" value={inputs.password} onChange={handleChange} />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
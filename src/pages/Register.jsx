import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api.js';

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/api/users/register', { name, email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      window.dispatchEvent(new Event('storage'));
      setMessage('Registered & logged in');
      navigate('/');
    } catch (err) {
      setMessage(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      {message && <p className="mb-4 text-primary">{message}</p>}
      <form onSubmit={submitHandler} className="space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="border p-2 w-full" />
        </div>
        <div>
          <label className="block mb-1">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 w-full" />
        </div>
        <div>
          <label className="block mb-1">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-2 w-full" />
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register; 
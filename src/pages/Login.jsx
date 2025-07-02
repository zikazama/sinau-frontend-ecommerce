import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api.js';
import { useSelector, useDispatch } from 'react-redux';
import authSlice from '../slices/authSlice.js';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { email, password, message } = useSelector(state => state.auth);
  const { setEmail, setPassword, setMessage } = authSlice;

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/api/users/login', { email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      // notify other components about auth change
      window.dispatchEvent(new Event('storage'));
      dispatch(setMessage('Logged in'));
      navigate('/');
    } catch (err) {
      dispatch(setMessage(err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      {message && <p className="mb-4 text-primary">{message}</p>}
      <form onSubmit={submitHandler} className="space-y-4">
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login; 
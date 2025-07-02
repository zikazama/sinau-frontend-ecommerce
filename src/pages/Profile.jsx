import { useEffect, useState } from 'react';
import api from '../api.js';

function Profile() {
  const [user, setUser] = useState({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const { data } = await api.get('/api/users/profile');
      setUser(data);
      setName(data.name);
      setEmail(data.email);
      setAvatar(data.avatar);
    };
    fetchProfile();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.put(
        '/api/users/profile',
        { name, email, avatar },
        {}
      );
      setMessage('Profile updated');
      localStorage.setItem('token', data.token);
    } catch (err) {
      setMessage(err.response?.data?.message || err.message);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      {message && <p className="mb-4 text-primary">{message}</p>}
      <form onSubmit={submitHandler} className="space-y-4 max-w-md">
        <div>
          <label className="block mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
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
          <label className="block mb-1">Avatar URL</label>
          <input
            type="text"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded" type="submit">
          Update
        </button>
      </form>
    </div>
  );
}

export default Profile; 
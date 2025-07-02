import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function useAuth() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [role, setRole] = useState(localStorage.getItem('role'));

  useEffect(() => {
    const handleStorage = () => {
      setToken(localStorage.getItem('token'));
      setRole(localStorage.getItem('role'));
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setToken(null);
    setRole(null);
  };

  return { token, role, logout };
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const { token, role, logout } = useAuth();
  return (
    <nav className="bg-primary text-white">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link to="/" className="font-bold text-xl">
          SinauShop
        </Link>
        <button
          className="md:hidden"
          onClick={() => setOpen((prev) => !prev)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <ul className={`md:flex gap-6 ${open ? 'block' : 'hidden'}`}>
          <li>
            <Link to="/cart" className="hover:underline" onClick={() => setOpen(false)}>
              Cart
            </Link>
          </li>
          {token && (
            <>
              <li>
                <Link to="/orders" className="hover:underline" onClick={() => setOpen(false)}>
                  Orders
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:underline" onClick={() => setOpen(false)}>
                  Profile
                </Link>
              </li>
              {role === 'admin' && (
                <li>
                  <Link to="/admin/products" className="hover:underline" onClick={() => setOpen(false)}>
                    Admin
                  </Link>
                </li>
              )}
              <li>
                <button onClick={logout} className="hover:underline">Logout</button>
              </li>
            </>
          )}
          {!token && (
            <>
              <li>
                <Link to="/login" className="hover:underline" onClick={() => setOpen(false)}>
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:underline" onClick={() => setOpen(false)}>
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar; 
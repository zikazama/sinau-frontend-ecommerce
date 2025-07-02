import { useEffect, useState } from 'react';
import api from '../../api.js';
import { Link, useNavigate } from 'react-router-dom';
import formatCurrency from '../../utils/formatCurrency.js';

function AdminProductList() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      const { data } = await api.get('/api/products?skip=0&limit=100');
      setProducts(data);
    };
    fetch();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Products</h1>
      <Link
        to="#"
        className="bg-primary text-white px-4 py-2 rounded inline-block mb-4"
      >
        Create Product
      </Link>
      <table className="min-w-full bg-white border">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border">ID</th>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Price</th>
            <th className="px-4 py-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td className="border px-4 py-2">{product._id}</td>
              <td className="border px-4 py-2">{product.name}</td>
              <td className="border px-4 py-2">{formatCurrency(product.price)}</td>
              <td className="border px-4 py-2 space-x-2">
                <button className="text-primary" onClick={() => navigate(`/admin/products/${product._id}/edit`)}>Edit</button>
                <button className="text-red-600" onClick={async () => {
                  if (confirm('Delete product?')) {
                    try {
                      await api.delete(`/api/products/${product._id}`);
                      setProducts(prev => prev.filter(p => p._id !== product._id));
                    } catch (err) {
                      alert(err.response?.data?.message || err.message);
                    }
                  }
                }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminProductList; 
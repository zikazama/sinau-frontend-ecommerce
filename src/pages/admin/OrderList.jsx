import { useEffect, useState } from 'react';
import api from '../../api.js';
import formatCurrency from '../../utils/formatCurrency.js';

function AdminOrderList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await api.get('/api/orders?skip=0&limit=100');
      setOrders(data);
    };
    fetch();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Orders</h1>
      <table className="min-w-full bg-white border">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border">ID</th>
            <th className="px-4 py-2 border">User</th>
            <th className="px-4 py-2 border">Total</th>
            <th className="px-4 py-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td className="border px-4 py-2">{order._id}</td>
              <td className="border px-4 py-2">{order.user.name}</td>
              <td className="border px-4 py-2">{formatCurrency(order.totalPrice)}</td>
              <td className="border px-4 py-2">{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminOrderList; 
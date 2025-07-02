import { useEffect, useState } from 'react';
import api from '../api.js';
import formatCurrency from '../utils/formatCurrency.js';

function OrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await api.get('/api/orders/myorders');
      setOrders(data);
    };
    fetchOrders();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="border p-4 rounded">
              <p className="font-semibold">ID: {order._id}</p>
              <p>Status: {order.status}</p>
              <p>Total: {formatCurrency(order.totalPrice)}</p>
              <p className="mt-2 font-semibold">Items:</p>
              <ul className="list-disc ml-6">
                {order.orderItems.map((item) => (
                  <li key={item.product._id}>{item.product.name} x {item.qty}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderHistory; 
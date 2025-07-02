import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api.js';
import formatCurrency from '../utils/formatCurrency.js';

function Checkout() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  const placeOrder = async () => {
    try {
      setLoading(true);
      await api.post('/api/orders', {
        orderItems: cartItems.map(({ _id, qty, price }) => ({ product: _id, qty, price })),
        totalPrice,
      });
      localStorage.removeItem('cart');
      navigate('/orders');
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) return <p>Your cart is empty.</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <p className="mb-6">Total: <span className="font-bold">{formatCurrency(totalPrice)}</span></p>
      <button
        disabled={loading}
        onClick={placeOrder}
        className="bg-primary text-white px-6 py-3 rounded disabled:opacity-60"
      >
        {loading ? 'Processing...' : 'Simulate Payment & Place Order'}
      </button>
    </div>
  );
}

export default Checkout; 
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import formatCurrency from '../utils/formatCurrency.js';

function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setCartItems(JSON.parse(localStorage.getItem('cart')) || []);
  }, []);

  const removeItem = (id) => {
    const updated = cartItems.filter((item) => item._id !== id);
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const total = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>
          Cart is empty. <Link to="/">Go Shopping</Link>
        </p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item._id} className="flex items-center gap-4 border p-4 rounded">
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded" />
                <div className="flex-1">
                  <Link to={`/product/${item._id}`} className="font-semibold">
                    {item.name}
                  </Link>
                  <p>Qty: {item.qty}</p>
                </div>
                <p className="font-bold">{formatCurrency(item.price * item.qty)}</p>
                <button className="text-red-600" onClick={() => removeItem(item._id)}>
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="border p-4 rounded h-fit">
            <h2 className="text-xl font-bold mb-2">Subtotal ({cartItems.length} items)</h2>
            <p className="text-2xl font-bold mb-4">{formatCurrency(total)}</p>
            <button
              onClick={() => navigate('/checkout')}
              className="w-full bg-primary text-white py-2 rounded"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api.js';
import formatCurrency from '../utils/formatCurrency.js';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await api.get(`/api/products/${id}`);
      setProduct(data);
    };
    fetchProduct();
  }, [id]);

  const addToCart = () => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const exist = cartItems.find((item) => item._id === product._id);
    if (exist) {
      exist.qty += qty;
    } else {
      cartItems.push({ ...product, qty });
    }
    localStorage.setItem('cart', JSON.stringify(cartItems));
    navigate('/cart');
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <img src={product.image} alt={product.name} className="w-full rounded" />
      <div>
        <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
        <p className="text-primary text-2xl mb-4">{formatCurrency(product.price)}</p>
        <p className="mb-6">{product.description}</p>
        <div className="flex items-center gap-2 mb-4">
          <label>Qty:</label>
          <input
            type="number"
            value={qty}
            min="1"
            onChange={(e) => setQty(Number(e.target.value))}
            className="border p-1 w-20"
          />
        </div>
        <button
          onClick={addToCart}
          className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetail; 
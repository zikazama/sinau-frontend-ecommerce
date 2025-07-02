import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api.js';
import formatCurrency from '../../utils/formatCurrency.js';

function ProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [stock, setStock] = useState(0);
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/api/products/${id}`);
        setName(data.name);
        setDescription(data.description);
        setPrice(data.price);
        setImage(data.image);
        setStock(data.stock);
        setCategory(data.category);
      } catch (err) {
        alert(err.response?.data?.message || err.message);
      }
    };
    fetchProduct();
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/api/products/${id}`, {
        name,
        description,
        price,
        image,
        stock,
        category,
      });
      setMessage('Product updated');
      setTimeout(() => navigate('/admin/products'), 1000);
    } catch (err) {
      setMessage(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      {message && <p className="mb-4 text-primary">{message}</p>}
      <form onSubmit={submitHandler} className="space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className="border p-2 w-full" />
        </div>
        <div>
          <label className="block mb-1">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="border p-2 w-full" />
        </div>
        <div>
          <label className="block mb-1">Price (Rp)</label>
          <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="border p-2 w-full" />
        </div>
        <div>
          <label className="block mb-1">Image URL</label>
          <input value={image} onChange={(e) => setImage(e.target.value)} className="border p-2 w-full" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Stock</label>
            <input type="number" value={stock} onChange={(e) => setStock(Number(e.target.value))} className="border p-2 w-full" />
          </div>
          <div>
            <label className="block mb-1">Category</label>
            <input value={category} onChange={(e) => setCategory(e.target.value)} className="border p-2 w-full" />
          </div>
        </div>
        <button className="bg-primary text-white px-6 py-2 rounded" type="submit">Update</button>
      </form>
    </div>
  );
}

export default ProductEdit; 
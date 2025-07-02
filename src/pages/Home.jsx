import { useEffect, useRef, useState, useCallback } from 'react';
import api from '../api.js';
import ProductCard from '../components/ProductCard.jsx';

const LIMIT = 20;

function Home() {
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const loader = useRef(null);

  const fetchProducts = useCallback(async () => {
    if (!hasMore) return;
    const { data } = await api.get(
      `/api/products?skip=${skip}&limit=${LIMIT}`
    );
    if (data.length < LIMIT) setHasMore(false);
    setProducts((prev) => [...prev, ...data]);
    setSkip((prev) => prev + LIMIT);
  }, [skip, hasMore]);

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchProducts();
      }
    });
    if (loader.current) observer.observe(loader.current);
    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, [fetchProducts]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      {hasMore && (
        <div ref={loader} className="py-10 text-center text-gray-500">
          Loading more...
        </div>
      )}
    </div>
  );
}

export default Home; 
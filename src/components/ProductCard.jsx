import { Link } from 'react-router-dom';
import formatCurrency from '../utils/formatCurrency.js';

function ProductCard({ product }) {
  return (
    <div className="border rounded-lg p-4 flex flex-col hover:shadow-lg transition-shadow">
      <Link to={`/product/${product._id}`}
        className="aspect-square overflow-hidden flex items-center justify-center bg-gray-100 rounded">
        {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
        <img src={product.image} alt={product.name} className="object-cover w-full h-full" />
      </Link>
      <h3 className="mt-2 font-semibold truncate">{product.name}</h3>
      <p className="text-primary font-bold">{formatCurrency(product.price)}</p>
    </div>
  );
}

export default ProductCard;

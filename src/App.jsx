import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import OrderHistory from './pages/OrderHistory.jsx';
import Profile from './pages/Profile.jsx';
import AdminProductList from './pages/admin/ProductList.jsx';
import AdminUserList from './pages/admin/UserList.jsx';
import AdminOrderList from './pages/admin/OrderList.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import ProductEdit from './pages/admin/ProductEdit.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Counter from './pages/Counter.jsx';
import { Provider } from 'react-redux';
import store from './slices/store.js';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-6">
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/counter" element={<Counter />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<OrderHistory />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* Admin */}
            <Route path="/admin/products" element={<ProtectedRoute adminOnly><AdminProductList /></ProtectedRoute>} />
            <Route path="/admin/users" element={<ProtectedRoute adminOnly><AdminUserList /></ProtectedRoute>} />
            <Route path="/admin/orders" element={<ProtectedRoute adminOnly><AdminOrderList /></ProtectedRoute>} />
            <Route path="/admin/products/:id/edit" element={<ProtectedRoute adminOnly><ProductEdit /></ProtectedRoute>} />
          </Routes>
        </Provider>
      </main>
      <footer className="bg-primary text-white py-4 text-center">© {new Date().getFullYear()} SinauShop</footer>
    </div>
  );
}

export default App; 
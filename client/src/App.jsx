import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/user/Dashboard';
import Contact from './pages/Contact';
import About from './pages/About';
import Policy from './pages/Policy';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import Login from './pages/Login';
import Private from './components/Routes/Private';
import Admin from './components/Routes/Admin';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateProduct from './pages/admin/CreateProduct';
import CreateCategory from './pages/admin/CreateCategory';
import Products from './pages/admin/Products';
import Users from './pages/admin/Users';
import Profile from './pages/user/Profile';
import Orders from './pages/user/Orders';
import UpdateProduct from './pages/admin/UpdateProduct';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Private />}>
        <Route path="user" element={<Dashboard />} />
        <Route path="user/profile" element={<Profile />} />
        <Route path="user/orders" element={<Orders />} />
      </Route>
      <Route path="/dashboard" element={<Admin />}>
      <Route  path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
          <Route path="admin/users" element={<Users />} />
      </Route>
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/policy" element={<Policy />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;

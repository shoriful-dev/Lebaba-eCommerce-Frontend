import { createBrowserRouter } from 'react-router-dom';
import '../App.css'
import App from '../App.jsx';
import Home from '../pages/home/Home.jsx';
import CategoryPage from '../pages/category/CategoryPage.jsx';
import ErrorPage from '../components/ErrorPage.jsx';
import Login from '../components/Login.jsx';
import Register from '../components/Register.jsx';
import ShopPage from '../pages/shop/ShopPage.jsx';
import SingleProduct from '../pages/shop/productDetails/SingleProduct.jsx';
import PaymentSuccess from '../components/PaymentSuccess.jsx';
import DashboardLayout from '../pages/dashboard/DashboardLayout.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/shop',
        element: <ShopPage />,
      },
      {
        path: '/shop/:id',
        element: <SingleProduct />,
      },
      {
        path: '/categories/:categoryName',
        element: <CategoryPage />,
      },
      {
        path: '/success',
        element: <PaymentSuccess />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      // users routes
      {
        path: '',
        element: <div>Dashboard</div>
      },
      {
        path: 'orders',
        element: <div>Orders path</div>,
      },
      {
        path: 'payments',
        element: <p>payments Path</p>,
      },
      {
        path: 'profile',
        element: <p>Profile</p>,
      },
      {
        path: 'reviews',
        element: <p>reviews</p>,
      },

      // admin routes
      {
        path: 'admin',
        element: <div>Admin Routes</div>
      },
      {
        path: 'add-product',
        element: <div>Admin Routes</div>
      },
      {
        path: 'manage-products',
        element: <div>Admin Routes</div>
      },
      {
        path: 'update-product/:id',
        element: <div>Admin Routes</div>
      },
      {
        path: 'manage-orders',
        element: <div>Admin Routes</div>
      },
    ],
  },
]);

export default router;

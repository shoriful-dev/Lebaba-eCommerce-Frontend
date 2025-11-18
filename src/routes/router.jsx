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

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/shop',
        element: <ShopPage/>
      },
      {
        path: '/shop/:id',
        element: <SingleProduct/>
      },
      {
        path: '/categories/:categoryName',
        element: <CategoryPage/>
      },
    ]
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/register',
    element: <Register/>
  }
]);

export default router;

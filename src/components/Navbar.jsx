import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import avatarImg from '../assets/avatar.png';
import { logout } from '../redux/features/auth/authSlice';
import { useLogoutUserMutation } from '../redux/features/auth/authApi';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user} = useSelector((state) => state.auth);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const handleDropDownToggle = () => {
    setIsDropDownOpen(!isDropDownOpen);
  }

  const userDropDownMenus = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Profile', path: '/dashboard/profile' },
    { label: 'Payments', path: '/dashboard/payments' },
    { label: 'Orders', path: '/dashboard/orders' },
  ];
  const adminDropDownMenus = [
    { label: 'Dashboard', path: '/dashboard/admin' },
    { label: 'Manage Items', path: '/dashboard/manage-items' },
    { label: 'All Orders', path: '/dashboard/manage-orders' },
    { label: 'Add Product', path: '/dashboard/add-product' },
  ];

  // admin Dropdown
  const dropDownMenu = user?.role === 'admin' ? [...adminDropDownMenus] : [...userDropDownMenus];
  
  const [logoutUser] = useLogoutUserMutation();
  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      alert('Logout successful!');
      navigate('/');
    } catch (error) {
      console.log('Error Logout', error)
    }
  }
  return (
    <header className="fixed-nav-bar w-nav">
      <nav className="max-w-screen-2xl mx-auto px-4 flex justify-between items-center">
        <ul className="nav__links">
          <li className="link">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Home
            </NavLink>
          </li>
          <li className="link">
            <NavLink
              to="/shop"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Shop
            </NavLink>
          </li>
          <li className="link">
            <NavLink
              to="/pages"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Pages
            </NavLink>
          </li>
          <li className="link">
            <NavLink
              to="/contact"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Contact
            </NavLink>
          </li>
        </ul>
        <div className="nav__logo">
          <Link to="/">
            Lebaba<span>.</span>
          </Link>
        </div>
        <div className="nav__icons relative">
          <span>
            <Link to="/search">
              <i className="ri-search-line"></i>
            </Link>
          </span>
          <span>
            <button className="hover:text-primary">
              <i className="ri-shopping-bag-line"></i>
              <sup className="text-sm inline-block px-1.5 text-white rounded-full bg-primary text-center">
                0
              </sup>
            </button>
          </span>
          <span>
            {user ? (
              <>
                <img
                  onClick={handleDropDownToggle}
                  src={user?.profileImage || avatarImg}
                  alt=""
                  className="size-6 rounded-full cursor-pointer"
                />
                {isDropDownOpen && (
                  <div className="absolute right-0 mt-3 w-48 p-4 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <ul className="font-medium space-y-4 p-2">
                      {dropDownMenu.map((menu, index) => (
                        <li key={index}>
                          <Link
                            onClick={() => handleDropDownToggle(false)}
                            to={menu.path}
                            className="dropdown-items"
                          >
                            {menu.label}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <Link onClick={handleLogout} className="dropdown-items">
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link to={'/login'}>
                <i className="ri-user-line rounded-full cursor-pointer"></i>
              </Link>
            )}
          </span>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

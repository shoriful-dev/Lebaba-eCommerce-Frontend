import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  const {user} = useSelector((state) => state.auth);
  console.log(user)
  return (
    <div>
      <h2>DashboardLayout</h2>
      <Outlet/>
    </div>
  );
}

export default DashboardLayout;

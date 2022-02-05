import React from 'react';
import { Dashboard } from '../pages/Dashboard/Dashboard';
import { Products } from '../pages/Admin/Products/Products';
import { Admins } from '../pages/Admin/Admins';
import Login from '../pages/Login/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BranchList from '../pages/Branch/BranchList';
import User from '../pages/Users/User';
import Shelf from '../pages/Shelf/Shelf';
import ProductReport from '../pages/ProductReport/ProductReport';
import SendSms from '../pages/SendSms/SendSms';

export const MyRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path='products' element={<Products />} />
          <Route path='login' element={<Login />} />
          <Route path='branches' element={<BranchList />} />
          <Route path='user' element={<User />} />
          <Route path='shelf' element={<Shelf />} />
          <Route path='products-report' element={<ProductReport />} />
          <Route path='send-sms' element={<SendSms />} />
        </Routes>
      </BrowserRouter>
      ,
    </>
  );
};

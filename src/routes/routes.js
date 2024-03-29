import React from 'react';
import { Dashboard } from '../pages/Dashboard/Dashboard';
import { Products } from '../pages/Admin/Products/Products';
import Login from '../pages/Login/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BranchList from '../pages/Branch/BranchList';
import User from '../pages/Users/User';
import Shelf from '../pages/Shelf/Shelf';
import ProductReport from '../pages/ProductReport/ProductReport';
import SendSms from '../pages/SendSms/SendSms';
import CheckIn from '../pages/CheckIn/CheckIn';
import { Stock } from '../pages/Stock/Stock';
import Invoice from '../pages/Invoice/Invoice';
import { Warehouse } from '../pages/Warehouse/Warehouse';
import { WithDraw } from '../pages/WithDraw/WithDraw';
import History from '../pages/History/History';

export const MyRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='products' element={<Products />} />
          <Route path='products-expiry' element={<BranchList />} />
          <Route path='user' element={<User />} />
          <Route path='shelf' element={<Shelf />} />
          <Route path='products-report' element={<ProductReport />} />
          <Route path='product-log' element={<CheckIn />} />
          <Route path='send-sms' element={<SendSms />} />
          <Route path='invoice' element={<Invoice />} />
          <Route path='stock' element={<Stock />} />
          {/* <Route path='warehouse' element={<Warehouse />} /> */}
          <Route path='withdraw' element={<WithDraw />} />
          <Route path='history' element={<History />} />
        </Routes>
      </BrowserRouter>
      ,
    </>
  );
};

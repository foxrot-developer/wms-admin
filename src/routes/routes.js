import React from 'react';
import {Dashboard} from '../pages/Admin/Dashboard/Dashboard'
import {Products} from '../pages/Admin/Products/Products'
import {Stock} from '../pages/Admin/Stock/Stock'
import { Admins } from '../pages/Admin/Admins/Admins';
import Login from '../pages/Login/Login'
import {
    BrowserRouter,
    Routes,
    Route
  } from "react-router-dom";

export const MyRoutes = () => {
  return (
  <>
    <BrowserRouter>
    <Routes>
        <Route index element={<Dashboard />} />
        <Route path='admins' element={<Admins />} />
        <Route path='products' element={<Products />} />
        <Route path='stock' element={<Stock />} />
        <Route path='/login' element={<Login />} />
    </Routes>
  </BrowserRouter>,
  </>
  )
};

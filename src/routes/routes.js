import React from 'react';
import {Dashboard} from '../pages/Admin/Dashboard/Dashboard'
import {Products} from '../pages/Admin/Products/Products'
import {AddProduct} from '../pages/Admin/Products/AddProduct/AddProduct'
import {EditProduct} from '../pages/Admin/Products/EditProduct/EditProduct'
import {Stock} from '../pages/Admin/Stock/Stock'
import { Admins } from '../pages/Admin/Admins/Admins';
import { AddAdmin } from '../pages/Admin/Admins/AddAdmin/AddAdmin';
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

        //Admin Routes
        <Route index element={<Dashboard />} />
        <Route path='admins' element={<Admins />} />
          <Route path='add-admin' element={<AddAdmin />} />
        
        //Product Routes
        <Route path='products' element={<Products />}/>
          <Route path='add-product' element={<AddProduct />}/>
          <Route path='products/edit-product' element={<EditProduct />}/>

        //Stock Routes
        <Route path='stock' element={<Stock />} />

        //Login Route
        <Route path='/login' element={<Login />} />
    </Routes>
  </BrowserRouter>,
  </>
  )
};

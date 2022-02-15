import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  AdSidebar,
  SidebarTop,
  SidebarMenu,
  SidebarBottom,
  Avatar,
} from './SidebarStyled';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import userImg from '../../../assets/images/user.jpeg';
import { useSelector } from 'react-redux';

const SideBar = () => {
  const admin = useSelector((state) => state.admin.admin);
  return (
    <>
      <AdSidebar>
        <SidebarTop>
          <div className='logo'>
            <NavLink to='/dashboard' className='text-decoration-none'>
              <h4>متجري</h4>
            </NavLink>
          </div>
        </SidebarTop>
        <SidebarMenu>
          <ul>
            <NavLink to='/dashboard' activeClassName='active'>
              <li>
                <span>
                  <WidgetsOutlinedIcon />
                </span>
                لوحة القيادة
              </li>
            </NavLink>
            <NavLink to='/products' activeClassName='active'>
              <li>
                <span>
                  <ShoppingBagOutlinedIcon />
                </span>
                قائمة المنتجات
              </li>
            </NavLink>
            <NavLink to='/user' activeClassName='active'>
              <li>
                <span>
                  <ShoppingBagOutlinedIcon />
                </span>
                قائمة المستخدم
              </li>
            </NavLink>
            <NavLink to='/shelf' activeClassName='active'>
              <li>
                <span>
                  <ShoppingBagOutlinedIcon />
                </span>
                قائمة الرف
              </li>
            </NavLink>
            <NavLink to='/products-report' activeClassName='active'>
              <li>
                <span>
                  <ShoppingBagOutlinedIcon />
                </span>
                تقرير المنتج
              </li>
            </NavLink>
            <NavLink to='/products-expiry' activeClassName='active'>
              <li>
                <span>
                  <ShoppingBagOutlinedIcon />
                </span>
                انتهاء صلاحية المنتجات
              </li>
            </NavLink>
            <NavLink to='/product-log' activeClassName='active'>
              <li>
                <span>
                  <ShoppingBagOutlinedIcon />
                </span>
                سجل المنتج
              </li>
            </NavLink>
            <NavLink to='/invoice' activeClassName='active'>
              <li>
                <span>
                  <ShoppingBagOutlinedIcon />
                </span>
                فاتورة
              </li>
            </NavLink>
            <NavLink to='/stock' activeClassName='active'>
              <li>
                <span>
                  <ShoppingBagOutlinedIcon />
                </span>
                المخزون
              </li>
            </NavLink>
            <NavLink to='/warehouse' activeClassName='active'>
              <li>
                <span>
                  <ShoppingBagOutlinedIcon />
                </span>
                مستودع
              </li>
            </NavLink>
            <NavLink to='/withdraw' activeClassName='active'>
              <li>
                <span>
                  <ShoppingBagOutlinedIcon />
                </span>
                طلب سحب
              </li>
            </NavLink>
          </ul>
        </SidebarMenu>
        <SidebarBottom>
          <Avatar>
            <NavLink to='/'>
              <div className='d-flex align-items-center'>
                <img
                  src={userImg}
                  alt='Avatar'
                  style={{
                    width: '40px',
                    height: '40px',
                  }}
                />
                <span>{admin.username}</span>
              </div>
            </NavLink>
          </Avatar>
        </SidebarBottom>
      </AdSidebar>
    </>
  );
};
export default SideBar;

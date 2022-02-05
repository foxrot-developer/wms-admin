import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  AdSidebar,
  SidebarTop,
  SidebarMenu,
  SidebarBottom,
  Avatar,
} from './SidebarStyled';
import MenuIcon from '@mui/icons-material/Menu';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import AdminPanelIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import userImg from '../../../assets/images/user.jpeg';

const SideBar = () => {
  return (
    <>
      <AdSidebar>
        <SidebarTop>
          <div className='logo'>
            <NavLink to='/' className='text-decoration-none'>
              <h4>متجري</h4>
            </NavLink>
          </div>
        </SidebarTop>
        <SidebarMenu>
          <ul>
            <NavLink to='/' activeClassName='active'>
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
            <NavLink to='/branches' activeClassName='active'>
              <li>
                <span>
                  <ShoppingBagOutlinedIcon />
                </span>
                الفروع
              </li>
            </NavLink>
            {/*
            <NavLink to='/send-sms' activeClassName='active'>
              <li>
                <span>
                  <ShoppingBagOutlinedIcon />
                </span>
                ارسل بريد الكتروني
              </li>
            </NavLink> */}
          </ul>
        </SidebarMenu>
        <SidebarBottom>
          <Avatar>
            <NavLink to='/'>
              <img src={userImg} alt='Avatar' />
              <span>جون ديو</span>
            </NavLink>
          </Avatar>
        </SidebarBottom>
      </AdSidebar>
    </>
  );
};
export default SideBar;

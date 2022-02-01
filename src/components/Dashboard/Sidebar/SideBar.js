import React from 'react';
import { NavLink } from 'react-router-dom';
import { AdSidebar, SidebarTop, SidebarMenu, SidebarBottom, Avatar } from './SidebarStyled'
import MenuIcon from '@mui/icons-material/Menu';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import AdminPanelIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import userImg from '../../../assets/images/user.jpeg'

const SideBar = () => {
  return (
  <>
    <AdSidebar>
            <SidebarTop>
                <div className='logo'>
                    <NavLink to='/'  className='text-decoration-none'><h4>MyShop</h4></NavLink>
                </div>
                <div className="hamburger">
                    <MenuIcon/>
                </div>
            </SidebarTop>
            <SidebarMenu>
                <ul>
                    <NavLink to='/' activeClassName='active'>
                        <li> <span><WidgetsOutlinedIcon/></span> Dashboard</li>
                    </NavLink>
                    <NavLink to='/admins' activeClassName='active'>
                        <li> <span><AdminPanelIcon/></span> Admins</li>
                    </NavLink>
                    <NavLink to='/products' activeClassName='active'>
                        <li><span><ShoppingBagOutlinedIcon/></span> Products</li>
                    </NavLink>
                    <NavLink to='/stock' activeClassName='active'>
                        <li><span><StorefrontOutlinedIcon/></span> Stock</li>
                    </NavLink>
                </ul>
            </SidebarMenu>
            <SidebarBottom>
                <Avatar>
                    <NavLink to=''>
                        <img src={userImg} alt="Avatar" />
                        <span>John Deo</span>
                    </NavLink>
                </Avatar>
                <div className='options-dot'>
                <NavLink to=''><MoreHorizOutlinedIcon/></NavLink>
                </div>
            </SidebarBottom>
        </AdSidebar>
  </>
  )
};
export default SideBar;
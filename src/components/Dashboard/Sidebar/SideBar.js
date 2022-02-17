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
import { useTranslation } from 'react-i18next';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import i18next from 'i18next';

const SideBar = () => {
  const { t } = useTranslation();
  const admin = useSelector((state) => state.admin.admin);
  return (
    <>
      <AdSidebar>
        <SidebarTop>
          <FormControl fullWidth className='form-control'>
            <InputLabel htmlFor='language'>{t('Language')}</InputLabel>
            <Select
              id='language'
              onChange={(e) => {
                i18next.changeLanguage(e.target.value);
              }}
            >
              <MenuItem value='en'>English</MenuItem>
              <MenuItem value='ar'>Arabic</MenuItem>
            </Select>
          </FormControl>
        </SidebarTop>
        <SidebarMenu>
          <ul>
            <NavLink to='/dashboard' activeClassName='active'>
              <li>
                <span>
                  <WidgetsOutlinedIcon />
                </span>
                {t('dashboard')}
              </li>
            </NavLink>
            <NavLink to='/products' activeClassName='active'>
              <li>
                <span>
                  <ShoppingBagOutlinedIcon />
                </span>
                {t('ProductsList')}
              </li>
            </NavLink>
            <NavLink to='/user' activeClassName='active'>
              <li>
                <span>
                  <ShoppingBagOutlinedIcon />
                </span>
                {t('UserList')}
              </li>
            </NavLink>
            <NavLink to='/shelf' activeClassName='active'>
              <li>
                <span>
                  <ShoppingBagOutlinedIcon />
                </span>
                {t('shelflist')}
              </li>
            </NavLink>
            <NavLink to='/products-report' activeClassName='active'>
              <li>
                <span>
                  <ShoppingBagOutlinedIcon />
                </span>
                {t('ProductReport')}
              </li>
            </NavLink>
            <NavLink to='/products-expiry' activeClassName='active'>
              <li>
                <span>
                  <ShoppingBagOutlinedIcon />
                </span>
                {t('ProductsExpiry')}
              </li>
            </NavLink>
            <NavLink to='/product-log' activeClassName='active'>
              <li>
                <span>
                  <ShoppingBagOutlinedIcon />
                </span>
                {t('ProductRegister')}
              </li>
            </NavLink>
            <NavLink to='/invoice' activeClassName='active'>
              <li>
                <span>
                  <ShoppingBagOutlinedIcon />
                </span>
                {t('invoice')}
              </li>
            </NavLink>
            <NavLink to='/stock' activeClassName='active'>
              <li>
                <span>
                  <ShoppingBagOutlinedIcon />
                </span>
                {t('Inventory')}
              </li>
            </NavLink>
            <NavLink to='/withdraw' activeClassName='active'>
              <li>
                <span>
                  <ShoppingBagOutlinedIcon />
                </span>
                {t('Withdrawalrequest')}
              </li>
            </NavLink>
            <NavLink to='/history' activeClassName='active'>
              <li>
                <span>
                  <ShoppingBagOutlinedIcon />
                </span>
                {t('history')}
              </li>
            </NavLink>
          </ul>
        </SidebarMenu>
      </AdSidebar>
    </>
  );
};
export default SideBar;

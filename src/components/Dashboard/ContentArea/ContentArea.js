import React from 'react';
import { Container, Row, Main } from './ContentAreaStyled';
import { StatsCard } from './StatsCard/StatsCard';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBagOutlined';
import StoreIcon from '@mui/icons-material/StorefrontOutlined';
import AdminIcon from '@mui/icons-material/AdminPanelSettingsOutlined';

export const ContentArea = () => {
  return (
    <>
      <Main>
        <Container>
          <Row className='row d-flex justify-content-center w-100 m-0'>
            <StatsCard
              icon={<ShoppingBagIcon />}
              title='قائمة المنتجات'
              link='/products'
            />
            <StatsCard
              icon={<ShoppingBagIcon />}
              title='قائمة المستخدم'
              link='/user'
            />
            <StatsCard
              icon={<ShoppingBagIcon />}
              title='قائمة الرف'
              link='/shelf'
            />
            <StatsCard
              icon={<ShoppingBagIcon />}
              title='تقرير المنتج'
              link='/products-report'
            />
            <StatsCard
              icon={<ShoppingBagIcon />}
              title='انتهاء صلاحية المنتجات'
              link='/products-expiry'
            />
            <StatsCard
              icon={<ShoppingBagIcon />}
              title='سجل المنتج'
              link='/product-log'
            />
            <StatsCard
              icon={<ShoppingBagIcon />}
              title='المخزون'
              link='/stock'
            />
            <StatsCard
              icon={<ShoppingBagIcon />}
              title='فاتورة'
              link='/invoice'
            />
          </Row>
        </Container>
      </Main>
    </>
  );
};

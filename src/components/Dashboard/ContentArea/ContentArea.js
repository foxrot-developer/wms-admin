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
              count='135'
              link='/products'
            />
            <StatsCard
              icon={<ShoppingBagIcon />}
              title='قائمة المستخدم'
              count='135'
              link='/user'
            />
            <StatsCard
              icon={<ShoppingBagIcon />}
              title='قائمة الرف'
              count='135'
              link='/shelf'
            />
            <StatsCard
              icon={<ShoppingBagIcon />}
              title='تقرير المنتج'
              count='135'
              link='/products-report'
            />
            {/* <StatsCard
              icon={<ShoppingBagIcon />}
              title='الفروع'
              count='135'
              link='/branches'
            />
            <StatsCard
              icon={<ShoppingBagIcon />}
              title='ارسل بريد الكتروني'
              count='135'
              link='/send-sms'
            /> */}
          </Row>
        </Container>
      </Main>
    </>
  );
};

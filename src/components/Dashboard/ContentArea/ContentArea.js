import React from 'react';
import { Container, Row, Main } from './ContentAreaStyled';
import {StatsCard} from './StatsCard/StatsCard'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBagOutlined';
import StoreIcon from '@mui/icons-material/StorefrontOutlined';
import AdminIcon from '@mui/icons-material/AdminPanelSettingsOutlined';

export const ContentArea = () => {
  return( 
    <>
        <Main>
          <Container className=''>
            <Row className='row d-flex justify-content-center w-100 m-0'>
            <StatsCard 
              icon={<AdminIcon/>}
              title="Admin"
              count="1"
              link='/admins'
            />
            <StatsCard 
              icon={<ShoppingBagIcon/>}
              title="Products"
              count="135"
              link='/products'
            />
            <StatsCard 
              icon={<StoreIcon/>}
              title="Stock"
              count="999"  
              link='/stock'
            />
            </Row>
          </Container>
        </Main>
    </>
  )
};

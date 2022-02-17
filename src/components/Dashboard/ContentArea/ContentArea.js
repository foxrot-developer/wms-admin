import React from 'react';
import { Container, Row, Main } from './ContentAreaStyled';
import { StatsCard } from './StatsCard/StatsCard';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBagOutlined';
import { useTranslation } from 'react-i18next';

export const ContentArea = () => {
  const { t } = useTranslation();
  return (
    <>
      <Main>
        <Container>
          <Row className='row d-flex justify-content-center w-100 m-0'>
            <StatsCard
              icon={<ShoppingBagIcon />}
              title={t('ProductsList')}
              link='/products'
            />
            <StatsCard
              icon={<ShoppingBagIcon />}
              title={t('UserList')}
              link='/user'
            />
            <StatsCard
              icon={<ShoppingBagIcon />}
              title={t('shelflist')}
              link='/shelf'
            />
            <StatsCard
              icon={<ShoppingBagIcon />}
              title={t('ProductReport')}
              link='/products-report'
            />
            <StatsCard
              icon={<ShoppingBagIcon />}
              title={t('ProductsExpiry')}
              link='/products-expiry'
            />
            <StatsCard
              icon={<ShoppingBagIcon />}
              title={t('ProductRegister')}
              link='/product-log'
            />
            <StatsCard
              icon={<ShoppingBagIcon />}
              title={t('Inventory')}
              link='/stock'
            />
            <StatsCard
              icon={<ShoppingBagIcon />}
              title={t('invoice')}
              link='/invoice'
            />
            <StatsCard
              icon={<ShoppingBagIcon />}
              title={t('Withdrawalrequest')}
              link='/withdraw'
            />
            <StatsCard
              icon={<ShoppingBagIcon />}
              title={t('history')}
              link='/history'
            />
          </Row>
        </Container>
      </Main>
    </>
  );
};

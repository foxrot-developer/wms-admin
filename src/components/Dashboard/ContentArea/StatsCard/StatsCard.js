import { t } from 'i18next';
import React from 'react';
import { Link } from 'react-router-dom';
import Col from './StatsCardStyled';
import { useTranslation } from 'react-i18next';
export const StatsCard = ({ icon, title, count, link }) => {
  const { t } = useTranslation();
  return (
    <>
      <Col className='column m-2'>
        <div className='icon-heading'>
          <h3>
            <span>{icon}</span>
            {title}
          </h3>
        </div>
        <div className='total-count'>
          <Link to={link}>{t('ViewAllDetails')}</Link>
        </div>
      </Col>
    </>
  );
};

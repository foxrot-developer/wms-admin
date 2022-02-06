import React from 'react';
import { Link } from 'react-router-dom';
import Col from './StatsCardStyled';
export const StatsCard = ({ icon, title, count, link }) => {
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
          <Link to={link}>View All Details</Link>
        </div>
      </Col>
    </>
  );
};

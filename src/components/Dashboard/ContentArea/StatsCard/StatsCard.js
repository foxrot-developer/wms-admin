import React from 'react';
import { Link } from 'react-router-dom';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import Col from './StatsCardStyled'
export const StatsCard = ({icon ,title, count, link}) => {
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
                <h2>{count}</h2>
                <Link to={link}>View All Details</Link>
            </div>

        </Col>
    </>
  )
};

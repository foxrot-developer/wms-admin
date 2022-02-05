import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Container, ContentWrap } from '../../components/Global/GlobalStyle';
import SideBar from '../../components/Dashboard/Sidebar/SideBar';
import { Link } from 'react-router-dom';

const ProductReport = () => {
  return (
    <Container>
      <ContentWrap>
        <SideBar />
        <div className='container p-md-5 '>
          <div className='row'>
            <div className='col-6'>
              <h2>ا تقرير المنتج</h2>
            </div>
          </div>
        </div>
      </ContentWrap>
    </Container>
  );
};

export default ProductReport;

import React from 'react';
import { Link } from 'react-router-dom';
import SideBar from '../../components/Dashboard/Sidebar/SideBar';
import { Container, ContentWrap } from '../../components/Global/GlobalStyle';

const SendSms = () => {
  return (
    <Container>
      <ContentWrap>
        <SideBar />
        <div className='container p-md-5 '>
          <div className='row'>
            <div className='col-6'>
              <h2>المسؤول (ق)</h2>
            </div>
          </div>
          <div className='row'></div>
        </div>
      </ContentWrap>
    </Container>
  );
};

export default SendSms;

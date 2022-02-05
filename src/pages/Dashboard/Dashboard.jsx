import React, { Fragment } from 'react';
import { Container, ContentWrap } from './DashboardStyled';
import SideBar from '../../components/Dashboard/Sidebar/SideBar';
import { ContentArea } from '../../components/Dashboard/ContentArea/ContentArea';
export const Dashboard = () => {
  return (
    <Fragment>
      <Container>
        <ContentWrap>
          <SideBar />
          <ContentArea />
        </ContentWrap>
      </Container>
    </Fragment>
  );
};

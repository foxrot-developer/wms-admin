import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import SideBar from '../../components/Dashboard/Sidebar/SideBar';
import { getAllWithDrawHistory } from '../../store/storeIndex';
import { Container, ContentWrap } from '../WithDraw/WithDrawStyled';

const History = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const withDraw = useSelector((state) => state.warehouse.withDrawHistory);
  useEffect(() => {
    dispatch(getAllWithDrawHistory());
  }, []);

  function formatDateAndTimeString(date) {
    var dd = (date.getDate() < 10 ? '0' : '') + date.getDate();

    var MM = (date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1);

    return `${date.getFullYear()}-${MM}-${dd} ${
      (date.getHours() < 10 ? '0' : '') + date.getHours()
    }:${(date.getMinutes() < 10 ? '0' : '') + date.getMinutes()}:${
      (date.getSeconds() < 10 ? '0' : '') + date.getSeconds()
    }`;
  }
  return (
    <Container>
      <ContentWrap>
        <SideBar />
        <div className='container p-md-5'>
          <div className='row'>
            <div className='col-6'>
              <h2>{t('Withdrawalrequest')}</h2>
            </div>
          </div>
          <div
            style={{
              height: '70vh',
              overflow: 'auto',
            }}
            className='row mt-4'
          >
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell width={50}>#</TableCell>
                    <TableCell width={150}>{t('productName')}</TableCell>
                    <TableCell width={150}>{t('name')}</TableCell>
                    <TableCell width={150}>{t('quantity')}</TableCell>
                    <TableCell width={150}>{t('withdrawDateTime')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {withDraw !== undefined &&
                    withDraw.map((product, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell component='th' scope='row'>
                          {index + 1}
                        </TableCell>
                        <TableCell>{product.product_name}</TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.requested_quantity}</TableCell>
                        <TableCell>
                          {formatDateAndTimeString(
                            new Date(product.withdraw_date_time)
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </ContentWrap>
    </Container>
  );
};

export default History;

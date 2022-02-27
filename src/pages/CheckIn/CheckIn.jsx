import React, { useEffect } from 'react';
import SideBar from '../../components/Dashboard/Sidebar/SideBar';
import { Container, ContentWrap } from '../../components/Global/GlobalStyle';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUserCheckIn } from '../../store/admin/actions/actionCreators';
import { useTranslation } from 'react-i18next';

const CheckIn = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const checkin = useSelector((state) => state.admin.checkin);
  const admin = useSelector((state) => state.admin.admin);
  console.log({ checkin });
  useEffect(() => {
    dispatch(getAllUserCheckIn(admin.id));
  }, []);
  function formatDateToString(date) {
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
        <div className='container p-md-5 '>
          <div className='row'>
            <div className='col-6'>
              <h2>{t('ProductsExpiry')}</h2>
            </div>
          </div>
          <div
            style={{
              height: '70vh',
              overflow: 'auto',
            }}
            className='row mt-6'
          >
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 450 }} aria-label='simple table'>
                <TableHead>
                  <TableCell scope='col'>#</TableCell>
                  <TableCell scope='col'>{t('productName')}</TableCell>
                  <TableCell scope='col'>{t('quantity')}</TableCell>
                  <TableCell scope='col'>{t('name')}</TableCell>
                  <TableCell scope='col'>{t('totalprice')}</TableCell>
                  <TableCell scope='col'>{t('barcode')}</TableCell>
                  <TableCell scope='col'>{t('Pay')}</TableCell>
                  <TableCell scope='col'>{t('ExpiryDate')}</TableCell>
                  <TableCell scope='col'>{t('checkedInTime')}</TableCell>
                  <TableCell scope='col'>{t('checkOutTime')}</TableCell>
                </TableHead>
                <TableBody>
                  {checkin !== undefined &&
                    checkin.map((shelf, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell component='th' scope='row'>
                          {index + 1}
                        </TableCell>
                        <TableCell>{shelf.product_name}</TableCell>
                        <TableCell>{shelf.quantity}</TableCell>
                        <TableCell>{shelf.name}</TableCell>
                        <TableCell>{shelf.total_price}</TableCell>
                        <TableCell>{shelf.barcode}</TableCell>
                        <TableCell>
                          {shelf.paid === 1 ? 'Paid' : 'UnPaid'}
                        </TableCell>
                        <TableCell>
                          {formatDateToString(new Date(shelf.expiry_date))}
                        </TableCell>
                        <TableCell>
                          {formatDateToString(new Date(shelf.checkin_time))}
                        </TableCell>
                        <TableCell>
                          {formatDateToString(new Date(shelf.checkout_time))}
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

export default CheckIn;

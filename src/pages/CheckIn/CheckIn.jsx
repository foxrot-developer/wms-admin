import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SideBar from '../../components/Dashboard/Sidebar/SideBar';
import { Container, ContentWrap } from '../../components/Global/GlobalStyle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  IconButton,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUserCheckIn } from '../../store/admin/actions/actionCreators';

const CheckIn = () => {
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
              <h2>سجل المنتج</h2>
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
                  <TableCell scope='col'>اسم المنتج</TableCell>
                  <TableCell scope='col'>كمية</TableCell>
                  <TableCell scope='col'>اسم</TableCell>
                  <TableCell scope='col'>السعر الكلي</TableCell>
                  <TableCell scope='col'>الباركود</TableCell>
                  <TableCell scope='col'>دفع</TableCell>
                  <TableCell scope='col'>تاريخ الانتهاء</TableCell>
                  <TableCell scope='col'>وقت الدجاج</TableCell>
                  <TableCell scope='col'>تحقق من الوقت</TableCell>
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

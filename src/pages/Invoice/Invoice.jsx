import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SideBar from '../../components/Dashboard/Sidebar/SideBar';
import {
  Container,
  ContentWrap,
  Header,
} from '../../components/Global/GlobalStyle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Autocomplete,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomerInvoice } from '../../store/admin/actions/actionCreators';

const Invoice = () => {
  const dispatch = useDispatch();
  const invoice = useSelector((state) => state.admin.invoice);
  const users = useSelector((state) => state.admin.users);
  const [data, setData] = React.useState('');
  return (
    <Container>
      <ContentWrap>
        <SideBar />
        <div className='container p-md-5 '>
          <div className='row'>
            <div className='col-6'>
              <h2>فاتورة</h2>
            </div>
            <div className='col-6'>
              <Grid container spacing={1}>
                <Grid item xs={8}>
                  <FormControl fullWidth>
                    <Autocomplete
                      fullWidth
                      id='customers'
                      options={users}
                      onChange={(e, value) => {
                        setData(value.id);
                      }}
                      getOptionLabel={(option) => option.name}
                      renderInput={(params) => (
                        <TextField {...params} label='Customer Name' />
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <div
                    onClick={() => {
                      dispatch(getCustomerInvoice(data));
                    }}
                    className='btn btn-primary'
                  >
                    بحث
                  </div>
                </Grid>
              </Grid>
            </div>
          </div>
          <div className='row'>
            <div className='col-6'>
              <Header>دفع</Header>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 450 }} aria-label='simple table'>
                  <TableHead>
                    <TableCell scope='col'>#</TableCell>
                    <TableCell scope='col'>اسم المنتج</TableCell>
                    <TableCell scope='col'>كمية</TableCell>
                    <TableCell scope='col'>السعر الكلي</TableCell>
                    <TableCell scope='col'>اسم</TableCell>
                  </TableHead>
                  <TableBody>
                    {invoice !== undefined &&
                      invoice.paid.data.map((shelf, index) => (
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
                          <TableCell>{shelf.total_price}</TableCell>
                          <TableCell>{shelf.name}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            <div className='col-6'>
              <Header>غير مدفوع الأجر</Header>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 450 }} aria-label='simple table'>
                  <TableHead>
                    <TableCell scope='col'>#</TableCell>
                    <TableCell scope='col'>اسم المنتج</TableCell>
                    <TableCell scope='col'>كمية</TableCell>
                    <TableCell scope='col'>السعر الكلي</TableCell>
                    <TableCell scope='col'>اسم</TableCell>
                  </TableHead>
                  <TableBody>
                    {invoice !== undefined &&
                      invoice.unpaid.data.map((shelf, index) => (
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
                          <TableCell>{shelf.total_price}</TableCell>
                          <TableCell>{shelf.name}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
      </ContentWrap>
    </Container>
  );
};

export default Invoice;

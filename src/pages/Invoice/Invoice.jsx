import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SideBar from '../../components/Dashboard/Sidebar/SideBar';
import {
  Container,
  ContentWrap,
  Header,
  InnerConatiner,
} from '../../components/Global/GlobalStyle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Autocomplete,
  FormControl,
  Grid,
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
import {
  getAllUsers,
  getCustomerInvoice,
} from '../../store/admin/actions/actionCreators';
import { useTranslation } from 'react-i18next';

const Invoice = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const invoice = useSelector((state) => state.admin.invoice);
  const users = useSelector((state) => state.admin.users);
  const [data, setData] = React.useState('');
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);
  return (
    <Container>
      <ContentWrap>
        <SideBar />
        <InnerConatiner>
          <div className='container p-md-5 '>
            <div className='row'>
              <div className='col-6'>
                <h2>{t('invoice')}</h2>
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
                <Header>{t('Pay')}</Header>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 450 }} aria-label='simple table'>
                    <TableHead>
                      <TableCell scope='col'>#</TableCell>
                      <TableCell scope='col'>{t('productName')}</TableCell>
                      <TableCell scope='col'>{t('quantity')}</TableCell>
                      <TableCell scope='col'>{t('totalprice')}</TableCell>
                      <TableCell scope='col'>{t('name')}</TableCell>
                    </TableHead>
                    <TableBody>
                      {invoice !== undefined &&
                        invoice.paid !== undefined &&
                        invoice.paid.data.length > 0 &&
                        invoice.paid?.data.map((shelf, index) => (
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
                <Header>
                  {t('Total')}: {invoice?.paid?.total[0].total_amount}
                </Header>
              </div>
              <div className='col-6'>
                <Header>{t('unPaid')}</Header>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 450 }} aria-label='simple table'>
                    <TableHead>
                      <TableCell scope='col'>#</TableCell>
                      <TableCell scope='col'>{t('productName')}</TableCell>
                      <TableCell scope='col'>{t('quantity')}</TableCell>
                      <TableCell scope='col'>{t('totalprice')}</TableCell>
                      <TableCell scope='col'>{t('name')}</TableCell>
                    </TableHead>
                    <TableBody>
                      {invoice !== undefined &&
                        invoice.unpaid !== undefined &&
                        invoice.unpaid?.data.length > 0 &&
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
                <Header>
                  {t('Total')}: {invoice?.unpaid?.total[0].total_amount}
                </Header>
              </div>
            </div>
          </div>
        </InnerConatiner>
      </ContentWrap>
    </Container>
  );
};

export default Invoice;

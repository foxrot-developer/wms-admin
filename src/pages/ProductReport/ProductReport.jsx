import React, { useEffect, useState } from 'react';
import {
  Container,
  ContentWrap,
  Header,
  InnerConatiner,
} from '../../components/Global/GlobalStyle';
import SideBar from '../../components/Dashboard/Sidebar/SideBar';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
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
import { useSelector, useDispatch } from 'react-redux';
import { getAllUsers } from '../../store/admin/actions/actionCreators';
import { getProductReport } from '../../store/product/actions/actionCreators';
import { useTranslation } from 'react-i18next';
import logo from '../../assets/Saudi-logo.png';

const ProductReport = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.admin.users);
  const productReport = useSelector((state) => state.product.productReport);
  const doc = new jsPDF();
  doc.autoTable({
    head: [
      [
        'product_name',
        'storage_type',
        'description',
        'price',
        'quantity',
        'customer_name',
        'total_price',
        'paid',
      ],
    ],
    body: productReport.map((report) => [
      report.product_name,
      report.storage_type,
      report.description,
      report.price,
      report.quantity,
      report.name,
      report.total_price,
      report.paid === 1 ? 'paid' : 'not paid',
    ]),
    margin: { top: 25 },
    didDrawPage: (data) => {
      doc.addImage(logo, 'JPEG', 10, 0, 50, 25);
    },
  });

  const [searchData, setSearchData] = useState({
    customer_id: '',
    from: '',
    to: '',
  });

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
                <h2>{t('ProductReport')}</h2>
              </div>
              <div className='col-6 add-btn '>
                <div
                  onClick={() => {
                    doc.save('table.pdf');
                  }}
                  className='btn btn-primary'
                >
                  PDF
                </div>
              </div>
            </div>
            <div className='row mt-5'>
              <div className='col-12'>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor='customer_id'>
                        {t('customerName')}
                      </InputLabel>
                      <Select
                        id='storage_type'
                        label={t('customerName')}
                        value={searchData.customer_id}
                        onChange={(e) =>
                          setSearchData({
                            ...searchData,
                            customer_id: e.target.value,
                          })
                        }
                      >
                        <MenuItem value=''>{t('chooseCustomer')}</MenuItem>
                        {user.map((item) => (
                          <MenuItem value={item.id}>{item.name}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      fullWidth
                      id='from'
                      type='date'
                      label={t('from')}
                      value={searchData.from}
                      onChange={(e) =>
                        setSearchData({
                          ...searchData,
                          from: e.target.value,
                        })
                      }
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      fullWidth
                      id='to'
                      type='date'
                      label={t('to')}
                      value={searchData.to}
                      onChange={(e) =>
                        setSearchData({
                          ...searchData,
                          to: e.target.value,
                        })
                      }
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <div
                      onClick={() => {
                        dispatch(getProductReport(searchData));
                      }}
                      className='btn btn-primary'
                    >
                      {t('search')}
                    </div>
                  </Grid>
                </Grid>
              </div>
            </div>
            <div className='col-12 '>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 450 }} aria-label='simple table'>
                  <TableHead>
                    <TableRow>
                      <TableCell width={50}>#</TableCell>
                      <TableCell width={50}>{t('productName')}</TableCell>
                      <TableCell width={50}>{t('storageType')}</TableCell>
                      <TableCell width={50}>{t('Describe')}</TableCell>
                      <TableCell width={50}>{t('price')}</TableCell>
                      <TableCell width={50}>{t('quantity')}</TableCell>
                      <TableCell width={50}>{t('name')}</TableCell>
                      <TableCell width={50}>{t('totalprice')}</TableCell>
                      <TableCell width={50}>{t('Pay')}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {productReport !== undefined &&
                      productReport.map((report, index) => (
                        <TableRow
                          key={index}
                          sx={{
                            '&:last-child td, &:last-child th': { border: 0 },
                          }}
                        >
                          <TableCell component='th' scope='row'>
                            {index + 1}
                          </TableCell>
                          <TableCell>{report.product_name}</TableCell>
                          <TableCell>{report.storage_type}</TableCell>
                          <TableCell>{report.description}</TableCell>
                          <TableCell>{report.price}</TableCell>
                          <TableCell>{report.quantity}</TableCell>
                          <TableCell>{report.name}</TableCell>
                          <TableCell>{report.total_price}</TableCell>
                          <TableCell>
                            {report.paid == '1' ? 'Paid' : 'UnPaid'}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </InnerConatiner>
      </ContentWrap>
    </Container>
  );
};

export default ProductReport;

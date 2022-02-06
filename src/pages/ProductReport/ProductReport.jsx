import React, { useEffect, useState } from 'react';
import {
  Container,
  ContentWrap,
  Header,
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

const ProductReport = () => {
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
        'shipment_type',
        'customer_id',
        'total_price',
        'paid',
        'barcode',
      ],
    ],
    body: productReport.map((report) => [
      report.product_name,
      report.storage_type,
      report.description,
      report.price,
      report.quantity,
      report.shipment_type,
      report.customer_id,
      report.total_price,
      report.paid,
      report.barcode,
    ]),
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
        <div className='container p-md-5 '>
          <div className='row'>
            <div className='col-6'>
              <h2>ا تقرير المنتج</h2>
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
                    <InputLabel htmlFor='customer_id'>العميل</InputLabel>
                    <Select
                      id='storage_type'
                      label='نوع التخزين'
                      value={searchData.customer_id}
                      onChange={(e) =>
                        setSearchData({
                          ...searchData,
                          customer_id: e.target.value,
                        })
                      }
                    >
                      <MenuItem value=''>
                        <em>لا أحد</em>
                      </MenuItem>
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
                    label='من'
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
                    label='الى'
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
                    بحث
                  </div>
                </Grid>
              </Grid>
            </div>
          </div>
          <div className='row mt-5'>
            <div className='col-12 '>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 450 }} aria-label='simple table'>
                  <TableHead>
                    <TableRow>
                      <TableCell width={50}>#</TableCell>
                      <TableCell width={50}>اسم المنتج</TableCell>
                      <TableCell width={50}>قوي</TableCell>
                      <TableCell width={50}>يصف</TableCell>
                      <TableCell width={50}>السعر</TableCell>
                      <TableCell width={50}>مقدار</TableCell>
                      <TableCell width={50}>نوع الشحن</TableCell>
                      <TableCell width={50}>هوية الزبون</TableCell>
                      <TableCell width={50}>السعر الكلي</TableCell>
                      <TableCell width={50}>يدفع</TableCell>
                      <TableCell width={50}>الباركود</TableCell>
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
                          <TableCell>{report.shipment_type}</TableCell>
                          <TableCell>{report.customer_id}</TableCell>
                          <TableCell>{report.total_price}</TableCell>
                          <TableCell>{report.paid}</TableCell>
                          <TableCell>{report.barcode}</TableCell>
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

export default ProductReport;

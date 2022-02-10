import React, { useEffect } from 'react';
import SideBar from '../../components/Dashboard/Sidebar/SideBar';
import {
  Container,
  ContentWrap,
  InnerConatiner,
} from '../../components/Global/GlobalStyle';
import { useDispatch, useSelector } from 'react-redux';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { getProductNearToExpire } from '../../store/product/actions/actionCreators';

const BranchList = () => {
  const dispatch = useDispatch();
  const productNearToExpire = useSelector(
    (state) => state.product.productNearToExpire
  );
  console.log(productNearToExpire);
  useEffect(() => {
    dispatch(getProductNearToExpire());
  }, []);
  return (
    <Container>
      <ContentWrap>
        <SideBar />
        <InnerConatiner>
          <div className='container p-md-5 '>
            <div className='row'>
              <div className='col-6'>
                <h2>انتهاء صلاحية المنتجات</h2>
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
                        <TableCell width={50}>تأسست في</TableCell>
                        <TableCell width={50}>تاريخ الانتهاء</TableCell>
                        <TableCell width={50}>الأيام المتبقية</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {productNearToExpire !== undefined &&
                        productNearToExpire.map((report, index) => (
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
                            <TableCell>
                              {report.created_at.split('T')[0]}
                            </TableCell>
                            <TableCell>
                              {report.expiry_date.split('T')[0]}
                            </TableCell>
                            <TableCell>{report.remaining_days}</TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
          </div>
        </InnerConatiner>
      </ContentWrap>
    </Container>
  );
};

export default BranchList;

import React, { useEffect, useState } from 'react';
import { Container, ContentWrap } from './WithDrawStyled';
import SideBar from '../../components/Dashboard/Sidebar/SideBar';
import CloseIcon from '@mui/icons-material/Close';
import {
  Grid,
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
import { getAllWithDraw, withDrawStatus } from '../../store/storeIndex';
import DoneIcon from '@mui/icons-material/Done';
export const WithDraw = () => {
  const dispatch = useDispatch();
  const withDraw = useSelector((state) => state.warehouse.withDraw);

  useEffect(() => {
    dispatch(getAllWithDraw());
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
              <h2>طلب سحب</h2>
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
                    <TableCell width={150}>وقت تاريخ السحب</TableCell>
                    <TableCell width={150}>اسم</TableCell>
                    <TableCell width={150}>اسم المنتج</TableCell>
                    <TableCell width={150}>كمية</TableCell>
                    <TableCell width={150}>السعر الكلي</TableCell>
                    <TableCell align='center' width={50}>
                      عمل
                    </TableCell>
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
                        <TableCell>
                          {formatDateAndTimeString(
                            new Date(product.withdraw_date_time)
                          )}
                        </TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.product_name}</TableCell>
                        <TableCell>{product.quantity}</TableCell>
                        <TableCell>{product.total_price}</TableCell>
                        <TableCell width={50}>
                          <div className='d-flex align-items-center justify-content-around'>
                            <IconButton>
                              <DoneIcon
                                onClick={() => {
                                  dispatch(withDrawStatus(product.id, 1));
                                }}
                              />
                            </IconButton>
                            <IconButton>
                              <CloseIcon
                                onClick={() => {
                                  dispatch(withDrawStatus(product.id, 0));
                                }}
                              />
                            </IconButton>
                          </div>
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

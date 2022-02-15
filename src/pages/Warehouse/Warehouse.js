import React, { useEffect, useState } from 'react';
import { Container, ContentWrap } from './WarehouseStyled';
import SideBar from '../../components/Dashboard/Sidebar/SideBar';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
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
import {
  addWarehouse,
  allWarehouseRequest,
  getAllWarehouse,
  removeStock,
  removeWarehouse,
  requestStatus,
  q,
} from '../../store/storeIndex';
import {
  Header,
  HeaderContainer,
  ModalBtnContainer,
  ModalContainer,
  ModalContent,
} from '../../components/Global/GlobalStyle';
import DoneIcon from '@mui/icons-material/Done';
export const Warehouse = () => {
  const dispatch = useDispatch();
  const warehouse = useSelector((state) => state.warehouse.warehouse);
  const request = useSelector((state) => state.warehouse.request);
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState({
    name: '',
  });

  const [requestModal, setRequestModal] = useState(false);

  useEffect(() => {
    dispatch(getAllWarehouse());
    dispatch(allWarehouseRequest());
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
        <Modal open={requestModal}>
          <ModalContainer>
            <ModalContent width='80%'>
              <HeaderContainer>
                <Header>طلب</Header>
                <IconButton onClick={() => setRequestModal(false)}>
                  <CloseIcon />
                </IconButton>
              </HeaderContainer>
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
                        <TableCell width={150}>وقت تاريخ التحويل</TableCell>
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
                      {request !== undefined &&
                        request.map((product, index) => (
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
                                new Date(product.transfer_date_time)
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
                                      dispatch(requestStatus(product.id, 1));
                                    }}
                                  />
                                </IconButton>
                                <IconButton>
                                  <CloseIcon
                                    onClick={() => {
                                      dispatch(requestStatus(product.id, 0));
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
            </ModalContent>
          </ModalContainer>
        </Modal>
        <Modal open={openModal}>
          <ModalContainer>
            <ModalContent>
              <HeaderContainer>
                <Header>مستودع</Header>
                <IconButton onClick={() => setOpenModal(false)}>
                  <CloseIcon />
                </IconButton>
              </HeaderContainer>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label='اسم'
                    value={data.name}
                    onChange={(e) =>
                      setData({
                        name: e.target.value,
                      })
                    }
                  />
                </Grid>
              </Grid>
              <ModalBtnContainer>
                <button
                  className='btn btn-danger'
                  onClick={() => setOpenModal(false)}
                >
                  إلغاء
                </button>
                <button
                  onClick={() => {
                    dispatch(addWarehouse(data));
                    setOpenModal(false);
                  }}
                  className='btn btn-success'
                >
                  يضيف
                </button>
              </ModalBtnContainer>
            </ModalContent>
          </ModalContainer>
        </Modal>
        <div className='container p-md-5'>
          <div className='row'>
            <div className='col-6'>
              <h2>مستودع</h2>
            </div>
            <div className='col-6 add-btn'>
              <div
                onClick={() => setOpenModal(true)}
                className='btn btn-primary'
              >
                إضافة مستودع
              </div>
              <div
                style={{
                  marginLeft: '10px',
                }}
                onClick={() => setRequestModal(true)}
                className='btn btn-primary'
              >
                طلب جديد
              </div>
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
                    <TableCell width={150}>اسم</TableCell>
                    <TableCell align='center' width={50}>
                      عمل
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {warehouse !== undefined &&
                    warehouse.map((product, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell component='th' scope='row'>
                          {index + 1}
                        </TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell width={50}>
                          <div className='d-flex align-items-center justify-content-around'>
                            <IconButton>
                              <DeleteIcon
                                onClick={() => {
                                  dispatch(removeWarehouse(product.id));
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

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, ContentWrap } from './ProductsStyled';
import SideBar from '../../../components/Dashboard/Sidebar/SideBar';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Barcode from 'react-barcode';
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
import {
  addProduct,
  deleteProduct,
  editProduct,
  getAllFloorProducts,
  getAllPallentProducts,
  getAllShelfDetail,
  getAllShelfProducts,
  getAllStock,
  getAllUsers,
  getAllWarehouse,
} from '../../../store/storeIndex';
import {
  Header,
  HeaderContainer,
  InnerConatiner,
  ModalBtnContainer,
  ModalContainer,
  ModalContent,
  ModalSearchContainer,
} from '../../../components/Global/GlobalStyle';
import PrintIcon from '@mui/icons-material/Print';
import BarcodeReader from 'react-barcode-reader';
import { getProductByBarcode } from '../../../store/product/actions/actionCreators';
import { GET_PRODUCT_BY_BARCODE } from '../../../store/product/actions/actionTypes';

export const Products = () => {
  const dispatch = useDispatch();
  const floorProducts = useSelector((state) => state.product.floorProducts);
  const pallentProducts = useSelector((state) => state.product.pallentProducts);
  const shelfProducts = useSelector((state) => state.product.shelfProducts);
  const shelfAllDetail = useSelector((state) => state.shelf.shelfAllDetail);
  const barcodeProduct = useSelector((state) => state.product.barcodeProduct);
  const users = useSelector((state) => state.admin.users);
  const warehouse = useSelector((state) => state.warehouse.warehouse);
  const stock = useSelector((state) => state.stock.stock);
  const [openModal, setOpenModal] = useState(false);
  const [productData, setProductData] = useState({
    product_id: '',
    storage_type: '',
    shelf_id: '',
    quantity: '',
    customer_id: '',
    paid: '',
    created_at: formatDateToString(new Date()),
    expiry_date: '',
    warehouse_id: '',
    barcode: getRandomInt(1000000000, 9999999999),
  });

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

  function formatDateToString(date) {
    var dd = (date.getDate() < 10 ? '0' : '') + date.getDate();

    var MM = (date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1);

    return `${date.getFullYear()}-${MM}-${dd}`;
  }

  function formatDateAndTimeString(date) {
    var dd = (date.getDate() < 10 ? '0' : '') + date.getDate();

    var MM = (date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1);

    return `${date.getFullYear()}-${MM}-${dd} ${
      (date.getHours() < 10 ? '0' : '') + date.getHours()
    }:${(date.getMinutes() < 10 ? '0' : '') + date.getMinutes()}:${
      (date.getSeconds() < 10 ? '0' : '') + date.getSeconds()
    }`;
  }

  const [openUpdateModal, setOpenUpdateModal] = useState({
    open: false,
    id: '',
  });

  useEffect(() => {
    dispatch(getAllStock());
    dispatch(getAllFloorProducts());
    dispatch(getAllShelfProducts());
    dispatch(getAllPallentProducts());
    dispatch(getAllShelfDetail());
    dispatch(getAllUsers());
    dispatch(getAllWarehouse());
  }, []);

  const [search, setSearch] = useState('');

  const [openBarCode, setOpenBarCode] = useState({
    open: false,
    id: '',
  });
  const [openSearchModal, setOpenSearchModal] = useState(false);

  return (
    <Container>
      <ContentWrap>
        <SideBar />
        <Modal open={openSearchModal}>
          <ModalContainer>
            <ModalContent>
              <HeaderContainer>
                <Header>Search Product</Header>
                <IconButton
                  onClick={() => {
                    dispatch({
                      type: GET_PRODUCT_BY_BARCODE,
                      payload: [],
                    });

                    setOpenSearchModal(false);
                  }}
                  style={{ marginLeft: 'auto' }}
                >
                  <CloseIcon />
                </IconButton>
              </HeaderContainer>
              <ModalSearchContainer>
                <BarcodeReader
                  onError={(err) => console.log(err)}
                  onScan={(data) => {
                    setSearch(data);
                    dispatch(getProductByBarcode(data));
                  }}
                />
                <TextField
                  fullWidth
                  type='number'
                  label='الكمية'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <div
                  style={{
                    padding: '5px',
                    backgroundColor: '#e0e0e0',
                    marginLeft: '2px',
                  }}
                  onClick={() => {
                    dispatch(getProductByBarcode(search));
                  }}
                >
                  البحث في الباركود
                </div>
              </ModalSearchContainer>
              {barcodeProduct !== undefined && barcodeProduct.length > 0 && (
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      disabled
                      type='text'
                      label='اسم المنتج'
                      value={barcodeProduct[0]?.product_name}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      disabled
                      type='text'
                      label='كمية'
                      value={barcodeProduct[0]?.quantity}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      disabled
                      type='text'
                      label='اسم'
                      value={barcodeProduct[0]?.name}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      disabled
                      type='text'
                      label='السعر الكلي'
                      value={barcodeProduct[0]?.total_price}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      disabled
                      type='text'
                      label='الباركود'
                      value={barcodeProduct[0]?.barcode}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      disabled
                      type='text'
                      label='دفع'
                      value={barcodeProduct[0]?.paid === 1 ? 'نقدي' : 'آجل'}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      disabled
                      type='text'
                      label='تاريخ الانتهاء'
                      value={formatDateAndTimeString(
                        new Date(barcodeProduct[0]?.expiry_date)
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <ModalBtnContainer>
                      <div
                        onClick={() => window.print()}
                        className='btn btn-primary'
                      >
                        مطبعة
                      </div>
                    </ModalBtnContainer>
                  </Grid>
                </Grid>
              )}
            </ModalContent>
          </ModalContainer>
        </Modal>
        <Modal open={openBarCode.open}>
          <ModalContainer>
            <ModalContent>
              <HeaderContainer>
                <Header>الباركود</Header>
                <IconButton
                  onClick={() =>
                    setOpenBarCode({
                      open: false,
                      id: '',
                    })
                  }
                >
                  <CloseIcon />
                </IconButton>
              </HeaderContainer>
              <Barcode value={openBarCode.id} />
              <ModalBtnContainer>
                <div className='col-6 add-btn'>
                  <div
                    onClick={() => window.print()}
                    className='btn btn-primary'
                  >
                    مطبعة
                  </div>
                </div>
              </ModalBtnContainer>
            </ModalContent>
          </ModalContainer>
        </Modal>
        <Modal open={openModal}>
          <ModalContainer>
            <ModalContent>
              <HeaderContainer>
                <Header>أضف الجرف</Header>
                <IconButton onClick={() => setOpenModal(false)}>
                  <CloseIcon />
                </IconButton>
              </HeaderContainer>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id='product_id'>منتج</InputLabel>
                    <Select
                      fullWidth
                      labelId='منتج'
                      id='product_id'
                      value={productData.product_id}
                      onChange={(e) =>
                        setProductData({
                          ...productData,
                          product_id: e.target.value,
                        })
                      }
                    >
                      {stock.map((item) => (
                        <MenuItem value={item.id}>{item.product_name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id='warehouse_id'>مستودع</InputLabel>
                    <Select
                      fullWidth
                      labelId='مستودع'
                      id='warehouse_id'
                      value={productData.warehouse_id}
                      onChange={(e) =>
                        setProductData({
                          ...productData,
                          warehouse_id: e.target.value,
                        })
                      }
                    >
                      {warehouse.map((item) => (
                        <MenuItem value={item.id}>{item.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id='storage_type'>نوع التخزين</InputLabel>
                    <Select
                      fullWidth
                      id='storage_type'
                      label='نوع التخزين'
                      value={productData.storage_type}
                      onChange={(e) =>
                        setProductData({
                          ...productData,
                          storage_type: e.target.value,
                        })
                      }
                    >
                      <MenuItem value=''>اختر نوع التخزين</MenuItem>
                      <MenuItem value='floor-space'>الجرف</MenuItem>
                      <MenuItem value='pallet'>الحمام</MenuItem>
                      <MenuItem value='shelf'>المكياج</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id='shelf_id'>الصندوق</InputLabel>
                    <Select
                      fullWidth
                      id='shelf_id'
                      label='الصندوق'
                      value={productData.shelf_id}
                      onChange={(e) =>
                        setProductData({
                          ...productData,
                          shelf_id: parseInt(e.target.value),
                        })
                      }
                    >
                      <MenuItem value=''>اختر الصندوق</MenuItem>
                      {shelfAllDetail.map((shelf) => (
                        <MenuItem value={shelf.id}>
                          {shelf.shelf_number}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type='number'
                    label='الكمية'
                    value={productData.quantity}
                    onChange={(e) =>
                      setProductData({
                        ...productData,
                        quantity: parseInt(e.target.value),
                      })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id='paid'>الدفع</InputLabel>
                    <Select
                      fullWidth
                      id='paid'
                      label='الدفع'
                      defaultValue=''
                      value={productData.paid}
                      onChange={(e) =>
                        setProductData({
                          ...productData,
                          paid: e.target.value,
                        })
                      }
                    >
                      <MenuItem value=''>اختر نوع الدفع</MenuItem>
                      <MenuItem value={1}>دفع</MenuItem>
                      <MenuItem value={0}>غير دفع</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type='date'
                    label='تاريخ الانتهاء'
                    value={productData.expiry_date}
                    onChange={(e) =>
                      setProductData({
                        ...productData,
                        expiry_date: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <Autocomplete
                      fullWidth
                      id='customers'
                      options={users}
                      onChange={(e, value) => {
                        setProductData({
                          ...productData,
                          customer_id: value.id,
                        });
                      }}
                      getOptionLabel={(option) => option.name}
                      renderInput={(params) => (
                        <TextField {...params} label='Customer Name' />
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type='number'
                    label='الباركود'
                    disabled
                    value={productData.barcode}
                    onChange={(e) =>
                      setProductData({
                        ...productData,
                        barcode: parseInt(e.target.value),
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
                    dispatch(addProduct(productData));
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
        <Modal open={openUpdateModal.open}>
          <ModalContainer>
            <ModalContent>
              <HeaderContainer>
                <Header>أضف الجرف</Header>
                <IconButton
                  onClick={() => {
                    setOpenUpdateModal(false);
                    setProductData({
                      product_id: '',
                      storage_type: '',
                      shelf_id: '',
                      quantity: '',
                      customer_id: '',
                      paid: '',
                      warehouse_id: '',
                      created_at: formatDateToString(new Date()),
                      expiry_date: '',
                      barcode: '',
                    });
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </HeaderContainer>

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id='product_id'>منتج</InputLabel>
                    <Select
                      fullWidth
                      labelId='منتج'
                      id='product_id'
                      value={productData.product_id}
                      onChange={(e) =>
                        setProductData({
                          ...productData,
                          product_id: e.target.value,
                        })
                      }
                    >
                      {stock.map((item) => (
                        <MenuItem value={item.id}>{item.product_name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id='warehouse_id'>مستودع</InputLabel>
                    <Select
                      fullWidth
                      labelId='مستودع'
                      id='warehouse_id'
                      value={productData.warehouse_id}
                      onChange={(e) =>
                        setProductData({
                          ...productData,
                          warehouse_id: e.target.value,
                        })
                      }
                    >
                      {warehouse.map((item) => (
                        <MenuItem value={item.id}>{item.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id='storage_type'>نوع التخزين</InputLabel>
                    <Select
                      fullWidth
                      id='storage_type'
                      label='نوع التخزين'
                      value={productData.storage_type}
                      onChange={(e) =>
                        setProductData({
                          ...productData,
                          storage_type: e.target.value,
                        })
                      }
                    >
                      <MenuItem value=''>اختر نوع التخزين</MenuItem>
                      <MenuItem value='floor-space'>الجرف</MenuItem>
                      <MenuItem value='pallet'>الحمام</MenuItem>
                      <MenuItem value='shelf'>المكياج</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id='shelf_id'>الصندوق</InputLabel>
                    <Select
                      fullWidth
                      id='shelf_id'
                      label='الصندوق'
                      value={productData.shelf_id}
                      onChange={(e) =>
                        setProductData({
                          ...productData,
                          shelf_id: parseInt(e.target.value),
                        })
                      }
                    >
                      <MenuItem value=''>اختر الصندوق</MenuItem>
                      {shelfAllDetail.map((shelf) => (
                        <MenuItem value={shelf.id}>
                          {shelf.shelf_number}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type='number'
                    label='الكمية'
                    value={productData.quantity}
                    onChange={(e) =>
                      setProductData({
                        ...productData,
                        quantity: parseInt(e.target.value),
                      })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id='paid'>الدفع</InputLabel>
                    <Select
                      fullWidth
                      id='paid'
                      label='الدفع'
                      defaultValue=''
                      value={productData.paid}
                      onChange={(e) =>
                        setProductData({
                          ...productData,
                          paid: e.target.value,
                        })
                      }
                    >
                      <MenuItem value=''>اختر نوع الدفع</MenuItem>
                      <MenuItem value={1}>دفع</MenuItem>
                      <MenuItem value={0}>غير دفع</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type='date'
                    label='تاريخ الانتهاء'
                    value={productData.expiry_date}
                    onChange={(e) =>
                      setProductData({
                        ...productData,
                        expiry_date: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <Autocomplete
                      fullWidth
                      id='customers'
                      options={users}
                      onChange={(e, value) => {
                        setProductData({
                          ...productData,
                          customer_id: value.id,
                        });
                      }}
                      getOptionLabel={(option) => option.name}
                      renderInput={(params) => (
                        <TextField {...params} label='Customer Name' />
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type='number'
                    label='الباركود'
                    disabled
                    value={productData.barcode}
                    onChange={(e) =>
                      setProductData({
                        ...productData,
                        barcode: parseInt(e.target.value),
                      })
                    }
                  />
                </Grid>
              </Grid>
              <ModalBtnContainer>
                <button
                  className='btn btn-danger'
                  onClick={() => setOpenUpdateModal(false)}
                >
                  إلغاء
                </button>
                <button
                  onClick={() => {
                    setOpenUpdateModal(false);
                    dispatch(editProduct(openUpdateModal.id, productData));
                  }}
                  className='btn btn-success'
                >
                  يضيف
                </button>
              </ModalBtnContainer>
            </ModalContent>
          </ModalContainer>
        </Modal>
        <InnerConatiner>
          <div className='row'>
            <div className='col-6'>
              <h2>منتجات</h2>
            </div>
            <div
              className='col-6'
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <div
                onClick={() => setOpenModal(true)}
                className='btn btn-primary'
              >
                أضف منتج
              </div>
              <div
                onClick={() => setOpenSearchModal(true)}
                className='btn btn-primary'
                style={{ marginLeft: '1em' }}
              >
                البحث في الباركود
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col'>
              <Header>منتجات الرف</Header>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                  <TableHead>
                    <TableRow>
                      <TableCell align='center' width={50}>
                        #
                      </TableCell>
                      <TableCell width={150}>اسم المنتج</TableCell>
                      <TableCell width={150}>اسم</TableCell>
                      <TableCell width={150}>وصف</TableCell>
                      <TableCell width={150}>السعر</TableCell>
                      <TableCell width={150}>كمية</TableCell>
                      <TableCell width={150}>السعر الكلي</TableCell>
                      <TableCell width={150}>دفع</TableCell>
                      <TableCell width={150}>الباركود</TableCell>
                      <TableCell width={150}>الجرف</TableCell>
                      <TableCell align='center' width={50}>
                        عدد
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {shelfProducts !== undefined &&
                      shelfProducts.map((product, index) => (
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
                          <TableCell>{product.description}</TableCell>
                          <TableCell>{product.price}</TableCell>
                          <TableCell>{product.quantity}</TableCell>
                          <TableCell>{product.total_price}</TableCell>
                          <TableCell>
                            {product.paid == '1' ? 'Paid' : 'UnPaid'}
                          </TableCell>
                          <TableCell>{product.barcode}</TableCell>
                          <TableCell>{product.shelf_number}</TableCell>
                          <TableCell align='center' width={50}>
                            <div className='d-flex align-items-center justify-content-around'>
                              <IconButton
                                onClick={() => {
                                  setProductData(product);
                                  setOpenUpdateModal({
                                    open: true,
                                    id: product.id,
                                  });
                                }}
                              >
                                <EditIcon />
                              </IconButton>
                              <IconButton
                                onClick={() => {
                                  setOpenBarCode({
                                    open: true,
                                    id: product.barcode,
                                  });
                                }}
                              >
                                <PrintIcon />
                              </IconButton>
                              <IconButton>
                                <DeleteIcon
                                  onClick={() => {
                                    dispatch(deleteProduct(product.id));
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
              <Header>منتجات الأرضيات</Header>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                  <TableHead>
                    <TableRow>
                      <TableCell align='center' width={50}>
                        #
                      </TableCell>
                      <TableCell width={150}>اسم المنتج</TableCell>
                      <TableCell width={150}>اسم</TableCell>
                      <TableCell width={150}>قوي</TableCell>
                      <TableCell width={150}>وصف</TableCell>
                      <TableCell width={150}>السعر</TableCell>
                      <TableCell width={150}>كمية</TableCell>
                      <TableCell width={150}>السعر الكلي</TableCell>
                      <TableCell width={150}>دفع</TableCell>
                      <TableCell width={150}>الباركود</TableCell>
                      <TableCell align='center' width={50}>
                        عدد
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {floorProducts !== undefined &&
                      floorProducts.map((product, index) => (
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
                          <TableCell>{product.storage_type}</TableCell>
                          <TableCell>{product.description}</TableCell>
                          <TableCell>{product.price}</TableCell>
                          <TableCell>{product.quantity}</TableCell>
                          <TableCell>{product.total_price}</TableCell>
                          <TableCell>
                            {product.paid == '1' ? 'Paid' : 'UnPaid'}
                          </TableCell>
                          <TableCell>{product.barcode}</TableCell>
                          <TableCell width={30}>
                            <div className='d-flex align-items-center justify-content-around'>
                              <IconButton
                                onClick={() => {
                                  setProductData(product);
                                  setOpenUpdateModal({
                                    open: true,
                                    id: product.id,
                                  });
                                }}
                              >
                                <EditIcon />
                              </IconButton>
                              <IconButton
                                onClick={() => {
                                  setOpenBarCode({
                                    open: true,
                                    id: product.barcode,
                                  });
                                }}
                              >
                                <PrintIcon />
                              </IconButton>
                              <IconButton>
                                <DeleteIcon
                                  onClick={() => {
                                    dispatch(deleteProduct(product.id));
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
              <Header>منتجات البليت</Header>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                  <TableHead>
                    <TableRow>
                      <TableCell align='center' width={50}>
                        #
                      </TableCell>
                      <TableCell width={150}>اسم المنتج</TableCell>
                      <TableCell width={150}>اسم</TableCell>
                      <TableCell width={150}>قوي</TableCell>
                      <TableCell width={150}>وصف</TableCell>
                      <TableCell width={150}>السعر</TableCell>
                      <TableCell width={150}>كمية</TableCell>
                      <TableCell width={150}>السعر الكلي</TableCell>
                      <TableCell width={150}>دفع</TableCell>
                      <TableCell width={150}>الباركود</TableCell>
                      <TableCell align='center' width={50}>
                        عدد
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {pallentProducts !== undefined &&
                      pallentProducts.map((product, index) => (
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
                          <TableCell>{product.storage_type}</TableCell>
                          <TableCell>{product.description}</TableCell>
                          <TableCell>{product.price}</TableCell>
                          <TableCell>{product.quantity}</TableCell>
                          <TableCell>{product.total_price}</TableCell>
                          <TableCell>
                            {product.paid == '1' ? 'Paid' : 'UnPaid'}
                          </TableCell>
                          <TableCell>{product.barcode}</TableCell>
                          <TableCell width={30}>
                            <div className='d-flex align-items-center justify-content-around'>
                              <IconButton
                                onClick={() => {
                                  setProductData(product);
                                  setOpenUpdateModal({
                                    open: true,
                                    id: product.id,
                                  });
                                }}
                              >
                                <EditIcon />
                              </IconButton>
                              <IconButton
                                onClick={() => {
                                  setOpenBarCode({
                                    open: true,
                                    id: product.barcode,
                                  });
                                }}
                              >
                                <PrintIcon />
                              </IconButton>
                              <IconButton>
                                <DeleteIcon
                                  onClick={() => {
                                    dispatch(deleteProduct(product.id));
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
        </InnerConatiner>
      </ContentWrap>
    </Container>
  );
};

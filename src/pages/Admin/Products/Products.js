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
import { useTranslation } from 'react-i18next';

export const Products = () => {
  const { t } = useTranslation();
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
                <Header>{t('BarcodeSearch')}</Header>
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
                  label={t('barcode')}
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
                  {t('BarcodeSearch')}
                </div>
              </ModalSearchContainer>
            </ModalContent>
          </ModalContainer>
        </Modal>
        <Modal open={openBarCode.open}>
          <ModalContainer>
            <ModalContent>
              <HeaderContainer>
                <Header>{t('barcode')}</Header>
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
                    {t('print')}
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
                <Header>{t('addProduct')}</Header>
                <IconButton onClick={() => setOpenModal(false)}>
                  <CloseIcon />
                </IconButton>
              </HeaderContainer>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id='product_id'>{t('product')}</InputLabel>
                    <Select
                      fullWidth
                      id='product_id'
                      label={t('product')}
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
                    <InputLabel id='warehouse_id'>{t('warehouse')}</InputLabel>
                    <Select
                      fullWidth
                      id='warehouse_id'
                      label={t('warehouse')}
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
                    <InputLabel id='storage_type'>
                      {t('storageType')}
                    </InputLabel>
                    <Select
                      fullWidth
                      id='storage_type'
                      label={t('storageType')}
                      value={productData.storage_type}
                      onChange={(e) =>
                        setProductData({
                          ...productData,
                          storage_type: e.target.value,
                        })
                      }
                    >
                      <MenuItem value=''>{t('choosestoragetype')}</MenuItem>
                      <MenuItem value='floor-space'>{t('floorspace')}</MenuItem>
                      <MenuItem value='pallet'>{t('pallet')}</MenuItem>
                      <MenuItem value='shelf'>{t('shelf')}</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id='shelf_id'>{t('shelflist')}</InputLabel>
                    <Select
                      fullWidth
                      id='shelf_id'
                      label={t('shelflist')}
                      value={productData.shelf_id}
                      onChange={(e) =>
                        setProductData({
                          ...productData,
                          shelf_id: parseInt(e.target.value),
                        })
                      }
                    >
                      <MenuItem value=''>{t('chooseshelf')}</MenuItem>
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
                    label={t('quantity')}
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
                    <InputLabel id='paid'>{t('paided')}</InputLabel>
                    <Select
                      fullWidth
                      id='paid'
                      label={t('paided')}
                      defaultValue=''
                      value={productData.paid}
                      onChange={(e) =>
                        setProductData({
                          ...productData,
                          paid: e.target.value,
                        })
                      }
                    >
                      <MenuItem value=''>{t('chooseStatus')}</MenuItem>
                      <MenuItem value={1}>{t('Pay')}</MenuItem>
                      <MenuItem value={0}>{t('unPaid')}</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type='date'
                    label={t('ExpiryDate')}
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
                    label={t('barcode')}
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
                  {t('cancle')}
                </button>
                <button
                  onClick={() => {
                    dispatch(addProduct(productData));
                    setOpenModal(false);
                  }}
                  className='btn btn-success'
                >
                  {t('add')}
                </button>
              </ModalBtnContainer>
            </ModalContent>
          </ModalContainer>
        </Modal>
        <Modal open={openUpdateModal.open}>
          <ModalContainer>
            <ModalContent>
              <HeaderContainer>
                <Header>{t('update')}</Header>
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
                    <InputLabel id='product_id'>{t('product')}</InputLabel>
                    <Select
                      fullWidth
                      labelId={t('product')}
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
                    <InputLabel id='warehouse_id'>{t('warehouse')}</InputLabel>
                    <Select
                      fullWidth
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
                    <InputLabel id='storage_type'>
                      {t('storageType')}
                    </InputLabel>
                    <Select
                      fullWidth
                      id='storage_type'
                      label={t('storageType')}
                      value={productData.storage_type}
                      onChange={(e) =>
                        setProductData({
                          ...productData,
                          storage_type: e.target.value,
                        })
                      }
                    >
                      <MenuItem value=''>{t('choosestoragetype')}</MenuItem>
                      <MenuItem value='floor-space'>{t('floorspace')}</MenuItem>
                      <MenuItem value='pallet'>{t('pallet')}</MenuItem>
                      <MenuItem value='shelf'>{t('shelf')}</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id='shelf_id'>{t('shelflist')}</InputLabel>
                    <Select
                      fullWidth
                      id='shelf_id'
                      label={t('shelflist')}
                      value={productData.shelf_id}
                      onChange={(e) =>
                        setProductData({
                          ...productData,
                          shelf_id: parseInt(e.target.value),
                        })
                      }
                    >
                      <MenuItem value=''>{t('chooseshelf')}</MenuItem>
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
                    label={t('quantity')}
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
                    <InputLabel id='paid'>{t('paided')}</InputLabel>
                    <Select
                      fullWidth
                      id='paid'
                      label={t('paided')}
                      defaultValue=''
                      value={productData.paid}
                      onChange={(e) =>
                        setProductData({
                          ...productData,
                          paid: e.target.value,
                        })
                      }
                    >
                      <MenuItem value=''>{t('chooseStatus')}</MenuItem>
                      <MenuItem value={1}>{t('Pay')}</MenuItem>
                      <MenuItem value={0}>{t('unPaid')}</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type='date'
                    label={t('ExpiryDate')}
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
                    label={t('barcode')}
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
                  {t('cancle')}
                </button>
                <button
                  onClick={() => {
                    setOpenUpdateModal(false);
                    dispatch(editProduct(openUpdateModal.id, productData));
                  }}
                  className='btn btn-success'
                >
                  {t('add')}
                </button>
              </ModalBtnContainer>
            </ModalContent>
          </ModalContainer>
        </Modal>
        <InnerConatiner>
          <div className='row'>
            <div className='col-6'>
              <h2>{t('products')}</h2>
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
                {t('addProduct')}
              </div>
              <div
                onClick={() => setOpenSearchModal(true)}
                className='btn btn-primary'
                style={{ marginLeft: '1em' }}
              >
                {t('BarcodeSearch')}
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col'>
              <Header>{t('shelfProducts')}</Header>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                  <TableHead>
                    <TableRow>
                      <TableCell align='center' width={50}>
                        #
                      </TableCell>
                      <TableCell width={150}>
                        {t('product')} {t('name')}
                      </TableCell>
                      <TableCell width={150}>{t('name')}</TableCell>
                      <TableCell width={150}>{t('Describe')}</TableCell>
                      <TableCell width={150}>{t('price')}</TableCell>
                      <TableCell width={150}>{t('totalQuantity')}</TableCell>
                      <TableCell width={150}>{t('totalprice')}</TableCell>
                      <TableCell width={150}>{t('Pay')}</TableCell>
                      <TableCell width={150}>{t('barcode')}</TableCell>
                      <TableCell width={150}>{t('shelfProducts')}</TableCell>
                      <TableCell align='center' width={50}>
                        {t('action')}
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
              <Header>{t('flooringProducts')}</Header>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                  <TableHead>
                    <TableRow>
                      <TableCell align='center' width={50}>
                        #
                      </TableCell>
                      <TableCell width={150}>
                        {t('product')} {t('name')}
                      </TableCell>
                      <TableCell width={150}>{t('name')}</TableCell>
                      <TableCell width={150}>{t('Describe')}</TableCell>
                      <TableCell width={150}>{t('price')}</TableCell>
                      <TableCell width={150}>{t('totalQuantity')}</TableCell>
                      <TableCell width={150}>{t('totalprice')}</TableCell>
                      <TableCell width={150}>{t('Pay')}</TableCell>
                      <TableCell width={150}>{t('barcode')}</TableCell>
                      <TableCell width={150}>{t('shelfProducts')}</TableCell>
                      <TableCell align='center' width={50}>
                        {t('action')}
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
              <Header>{t('palletProducts')}</Header>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                  <TableHead>
                    <TableRow>
                      <TableCell align='center' width={50}>
                        #
                      </TableCell>
                      <TableCell width={150}>
                        {t('product')} {t('name')}
                      </TableCell>
                      <TableCell width={150}>{t('name')}</TableCell>
                      <TableCell width={150}>{t('storageType')}</TableCell>
                      <TableCell width={150}>{t('price')}</TableCell>
                      <TableCell width={150}>{t('totalQuantity')}</TableCell>
                      <TableCell width={150}>{t('totalprice')}</TableCell>
                      <TableCell width={150}>{t('Pay')}</TableCell>
                      <TableCell width={150}>{t('barcode')}</TableCell>
                      <TableCell width={150}>{t('shelfProducts')}</TableCell>
                      <TableCell align='center' width={50}>
                        {t('action')}
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

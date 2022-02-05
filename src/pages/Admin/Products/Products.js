import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, ContentWrap } from './ProductsStyled';
import SideBar from '../../../components/Dashboard/Sidebar/SideBar';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
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
} from '../../../store/storeIndex';
import {
  Header,
  HeaderContainer,
  ModalBtnContainer,
  ModalContainer,
  ModalContent,
} from '../../../components/Global/GlobalStyle';
export const Products = () => {
  const dispatch = useDispatch();
  const floorProducts = useSelector((state) => state.product.floorProducts);
  const pallentProducts = useSelector((state) => state.product.pallentProducts);
  const shelfProducts = useSelector((state) => state.product.shelfProducts);
  const shelfAllDetail = useSelector((state) => state.shelf.shelfAllDetail);
  const [openModal, setOpenModal] = useState(false);
  const [productData, setProductData] = useState({
    product_name: '',
    description: '',
    storage_type: '',
    shelf_id: '',
    price: 0,
    quantity: 0,
    shipment_type: '',
    customer_id: 5,
    paid: '',
    created_at: formatDateToString(new Date()),
    expiry_date: '',
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

  const [openUpdateModal, setOpenUpdateModal] = useState({
    open: false,
    id: '',
  });

  useEffect(() => {
    dispatch(getAllFloorProducts());
    dispatch(getAllShelfProducts());
    dispatch(getAllPallentProducts());
    dispatch(getAllShelfDetail());
  }, []);

  return (
    <Container>
      <ContentWrap>
        <SideBar />
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
                  <TextField
                    fullWidth
                    label='اسم المنتج'
                    value={productData.product_name}
                    onChange={(e) =>
                      setProductData({
                        ...productData,
                        product_name: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label='الوصف'
                    value={productData.description}
                    onChange={(e) =>
                      setProductData({
                        ...productData,
                        description: e.target.value,
                      })
                    }
                  />
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
                    label='السعر'
                    value={productData.price}
                    onChange={(e) =>
                      setProductData({
                        ...productData,
                        price: parseInt(e.target.value),
                      })
                    }
                  />
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
                    <InputLabel id='shipment_type'>نوع الشحن</InputLabel>
                    <Select
                      fullWidth
                      id='shipment_type'
                      label='نوع الشحن'
                      defaultValue=''
                      value={productData.shipment_type}
                      onChange={(e) =>
                        setProductData({
                          ...productData,
                          shipment_type: e.target.value,
                        })
                      }
                    >
                      <MenuItem value=''>اختر نوع الشحن</MenuItem>
                      <MenuItem value='local'>المحلي</MenuItem>
                      <MenuItem value='international'>الدولي</MenuItem>
                    </Select>
                  </FormControl>
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
                </Grid>{' '}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type='number'
                    label='رقم الزبون'
                    value={productData.customer_id}
                    onChange={(e) =>
                      setProductData({
                        ...productData,
                        customer_id: parseInt(e.target.value),
                      })
                    }
                  />
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
                    dispatch(
                      addProduct({
                        product_name: productData.product_name,
                        description: productData.description,
                        storage_type: productData.storage_type,
                        shelf_id: productData.shelf_id,
                        price: productData.price,
                        quantity: productData.quantity,
                        shipment_type: productData.shipment_type,
                        customer_id: productData.customer_id,
                        paid: productData.paid,
                        created_at: productData.created_at,
                        expiry_date: productData.expiry_date,
                        barcode: productData.barcode,
                      })
                    );
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
                      product_name: '',
                      description: '',
                      storage_type: '',
                      shelf_id: '',
                      price: '',
                      quantity: '',
                      shipment_type: '',
                      customer_id: '',
                      paid: '',
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
                  <TextField
                    fullWidth
                    label='اسم المنتج'
                    value={productData.product_name}
                    onChange={(e) =>
                      setProductData({
                        ...productData,
                        product_name: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label='الوصف'
                    value={productData.description}
                    onChange={(e) =>
                      setProductData({
                        ...productData,
                        description: e.target.value,
                      })
                    }
                  />
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
                    label='السعر'
                    value={productData.price}
                    onChange={(e) =>
                      setProductData({
                        ...productData,
                        price: parseInt(e.target.value),
                      })
                    }
                  />
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
                    <InputLabel id='shipment_type'>نوع الشحن</InputLabel>
                    <Select
                      fullWidth
                      id='shipment_type'
                      label='نوع الشحن'
                      defaultValue=''
                      value={productData.shipment_type}
                      onChange={(e) =>
                        setProductData({
                          ...productData,
                          shipment_type: e.target.value,
                        })
                      }
                    >
                      <MenuItem value=''>اختر نوع الشحن</MenuItem>
                      <MenuItem value='local'>المحلي</MenuItem>
                      <MenuItem value='international'>الدولي</MenuItem>
                    </Select>
                  </FormControl>
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
                  <TextField
                    fullWidth
                    type='number'
                    label='رقم الزبون'
                    value={productData.customer_id}
                    onChange={(e) =>
                      setProductData({
                        ...productData,
                        customer_id: parseInt(e.target.value),
                      })
                    }
                  />
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
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '5em',
            overflow: 'auto ',
            height: '100vh',
          }}
        >
          <div className='row'>
            <div className='col-6'>
              <h2>منتجات</h2>
            </div>
            <div className='col-6 add-btn'>
              <div
                onClick={() => setOpenModal(true)}
                className='btn btn-primary'
              >
                أضف منتج
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
                      <TableCell width={50}>#</TableCell>
                      <TableCell width={150}>اسم المنتج</TableCell>
                      <TableCell width={150}>وصف</TableCell>
                      <TableCell width={150}>السعر</TableCell>
                      <TableCell width={150}>كمية</TableCell>
                      <TableCell width={150}>نوع الشحن</TableCell>
                      <TableCell width={150}>السعر الكلي</TableCell>
                      <TableCell width={150}>دفع</TableCell>
                      <TableCell width={150}>الباركود</TableCell>
                      <TableCell width={150}>الجرف</TableCell>
                      <TableCell width={50}>عدد</TableCell>
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
                          <TableCell>{product.description}</TableCell>
                          <TableCell>{product.price}</TableCell>
                          <TableCell>{product.quantity}</TableCell>
                          <TableCell>{product.shipment_type}</TableCell>
                          <TableCell>{product.total_price}</TableCell>
                          <TableCell>{product.paid}</TableCell>
                          <TableCell>{product.barcode}</TableCell>
                          <TableCell>{product.shelf_number}</TableCell>
                          <TableCell width={50}>
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
                      <TableCell width={50}>#</TableCell>
                      <TableCell width={150}>الجرف</TableCell>
                      <TableCell width={150}>اسم المنتج</TableCell>
                      <TableCell width={150}>قوي</TableCell>
                      <TableCell width={150}>وصف</TableCell>
                      <TableCell width={150}>السعر</TableCell>
                      <TableCell width={150}>كمية</TableCell>
                      <TableCell width={150}>نوع الشحن</TableCell>
                      <TableCell width={150}>هوية الزبون</TableCell>
                      <TableCell width={150}>السعر الكلي</TableCell>
                      <TableCell width={150}>دفع</TableCell>
                      <TableCell width={150}>الباركود</TableCell>
                      <TableCell width={50}>عدد</TableCell>
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
                          <TableCell>{product.shelf_id}</TableCell>
                          <TableCell>{product.product_name}</TableCell>
                          <TableCell>{product.storage_type}</TableCell>
                          <TableCell>{product.description}</TableCell>
                          <TableCell>{product.price}</TableCell>
                          <TableCell>{product.quantity}</TableCell>
                          <TableCell>{product.shipment_type}</TableCell>
                          <TableCell>{product.customer_id}</TableCell>
                          <TableCell>{product.total_price}</TableCell>
                          <TableCell>{product.paid}</TableCell>
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
                      <TableCell width={50}>#</TableCell>
                      <TableCell width={150}>الجرف</TableCell>
                      <TableCell width={150}>اسم المنتج</TableCell>
                      <TableCell width={150}>قوي</TableCell>
                      <TableCell width={150}>وصف</TableCell>
                      <TableCell width={150}>السعر</TableCell>
                      <TableCell width={150}>كمية</TableCell>
                      <TableCell width={150}>نوع الشحن</TableCell>
                      <TableCell width={150}>هوية الزبون</TableCell>
                      <TableCell width={150}>السعر الكلي</TableCell>
                      <TableCell width={150}>دفع</TableCell>
                      <TableCell width={150}>الباركود</TableCell>
                      <TableCell width={50}>عدد</TableCell>
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
                          <TableCell>{product.shelf_id}</TableCell>
                          <TableCell>{product.product_name}</TableCell>
                          <TableCell>{product.storage_type}</TableCell>
                          <TableCell>{product.description}</TableCell>
                          <TableCell>{product.price}</TableCell>
                          <TableCell>{product.quantity}</TableCell>
                          <TableCell>{product.shipment_type}</TableCell>
                          <TableCell>{product.customer_id}</TableCell>
                          <TableCell>{product.total_price}</TableCell>
                          <TableCell>{product.paid}</TableCell>
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
        </div>
      </ContentWrap>
    </Container>
  );
};

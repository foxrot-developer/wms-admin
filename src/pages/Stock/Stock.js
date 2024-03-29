import React, { useEffect, useState } from 'react';
import { Container, ContentWrap } from './StockStyled';
import SideBar from '../../components/Dashboard/Sidebar/SideBar';
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
  addStock,
  deleteProduct,
  editProduct,
  getAllFloorProducts,
  getAllPallentProducts,
  getAllShelfDetail,
  getAllShelfProducts,
  getAllStock,
  removeStock,
} from '../../store/storeIndex';
import {
  Header,
  HeaderContainer,
  ModalBtnContainer,
  ModalContainer,
  ModalContent,
} from '../../components/Global/GlobalStyle';
import { useTranslation } from 'react-i18next';
export const Stock = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const stock = useSelector((state) => state.stock.stock);
  const [openModal, setOpenModal] = useState(false);
  const [productData, setProductData] = useState({
    prodImage: '',
    product_name: '',
    description: '',
    price: 0,
    quantity: 0,
  });

  useEffect(() => {
    dispatch(getAllStock());
  }, []);

  return (
    <Container>
      <ContentWrap>
        <SideBar />
        <Modal open={openModal}>
          <ModalContainer>
            <ModalContent>
              <HeaderContainer>
                <Header>{t('Inventory')}</Header>
                <IconButton onClick={() => setOpenModal(false)}>
                  <CloseIcon />
                </IconButton>
              </HeaderContainer>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type='file'
                    onChange={(e) => {
                      setProductData({
                        ...productData,
                        prodImage: e.target.files[0],
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label={t('productName')}
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
                    label={t('Describe')}
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
                  <TextField
                    fullWidth
                    type='number'
                    label={t('price')}
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
                    const formData = new FormData();
                    formData.append('prodImage', productData.prodImage);
                    formData.append('product_name', productData.product_name);
                    formData.append('description', productData.description);
                    formData.append('price', productData.price);
                    formData.append('quantity', productData.quantity);
                    dispatch(addStock(formData));
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
        <div className='container p-md-5'>
          <div className='row'>
            <div className='col-6'>
              <h2>{t('Inventory')}</h2>
            </div>
            <div className='col-6 add-btn'>
              <div
                onClick={() => setOpenModal(true)}
                className='btn btn-primary'
              >
                {t('add')}
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
                    <TableCell width={150}>{t('productName')}</TableCell>
                    <TableCell width={150}>{t('img')}</TableCell>
                    <TableCell width={150}>{t('Describe')}</TableCell>
                    <TableCell width={150}>{t('price')}</TableCell>
                    <TableCell width={150}>{t('quantity')}</TableCell>
                    <TableCell width={50}>{t('shelfQuantity')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stock !== undefined &&
                    stock.map((product, index) => (
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
                        <TableCell>
                          <img
                            style={{ width: '150px', height: '100px' }}
                            src={'https://wmsss.herokuapp.com/' + product.image}
                            alt='product'
                          />
                        </TableCell>
                        <TableCell>{product.description}</TableCell>
                        <TableCell>{product.price}</TableCell>
                        <TableCell>{product.quantity}</TableCell>
                        <TableCell width={50}>
                          <div className='d-flex align-items-center justify-content-around'>
                            <IconButton>
                              <DeleteIcon
                                onClick={() => {
                                  dispatch(removeStock(product.id));
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

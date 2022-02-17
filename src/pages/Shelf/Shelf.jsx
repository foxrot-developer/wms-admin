import React, { useEffect, useState } from 'react';
import SideBar from '../../components/Dashboard/Sidebar/SideBar';
import {
  Container,
  ContentWrap,
  Header,
  HeaderContainer,
  ModalBtnContainer,
  ModalContainer,
  ModalContent,
} from '../../components/Global/GlobalStyle';
import { useDispatch, useSelector } from 'react-redux';
import {
  addShelfProduct,
  deleteShelfProduct,
  editShelfProduct,
  getAllShelf,
  getAllShelfDetail,
} from '../../store/storeIndex';
import {
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
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from 'react-i18next';

const Shelf = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const shelfAll = useSelector((state) => state.shelf.shelfAll);
  const shelfAllDetail = useSelector((state) => state.shelf.shelfAllDetail);

  useEffect(() => {
    dispatch(getAllShelf());
    dispatch(getAllShelfDetail());
  }, []);

  const [openModal, setOpenModal] = useState(false);
  const [shelfName, setShelfName] = useState('');
  const [openUpdateModal, setOpenUpdateModal] = useState({
    open: false,
    id: '',
  });

  return (
    <Container>
      <ContentWrap>
        <SideBar />
        <Modal open={openModal}>
          <ModalContainer>
            <ModalContent>
              <HeaderContainer>
                <Header>{t('shelfProducts')}</Header>
                <IconButton onClick={() => setOpenModal(false)}>
                  <CloseIcon />
                </IconButton>
              </HeaderContainer>
              <TextField
                fullWidth
                id='standard-basic'
                label={t('name')}
                onChange={(e) => {
                  setShelfName(e.target.value);
                }}
              />
              <ModalBtnContainer>
                <button
                  className='btn btn-danger'
                  onClick={() => setOpenModal(false)}
                >
                  {t('cancle')}
                </button>
                <button
                  onClick={() => {
                    dispatch(
                      addShelfProduct({
                        shelf_number: shelfName.toUpperCase(),
                      })
                    );
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
                <Header>{t('shelfProducts')}</Header>
                <IconButton
                  onClick={() => {
                    setShelfName('');
                    setOpenUpdateModal(false);
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </HeaderContainer>
              <TextField
                fullWidth
                id='standard-basic'
                label={t('name')}
                value={shelfName}
                onChange={(e) => {
                  setShelfName(e.target.value);
                }}
              />
              <ModalBtnContainer>
                <button
                  className='btn btn-danger'
                  onClick={() => setOpenUpdateModal(false)}
                >
                  {t('cancle')}
                </button>
                <button
                  onClick={() => {
                    dispatch(
                      editShelfProduct(openUpdateModal.id, {
                        shelf_number: shelfName.toUpperCase(),
                      })
                    );
                    setOpenUpdateModal(false);
                  }}
                  className='btn btn-success'
                >
                  {t('add')}
                </button>
              </ModalBtnContainer>
            </ModalContent>
          </ModalContainer>
        </Modal>
        <div
          style={{
            height: '100vh',
            overflow: 'auto',
          }}
          className='container p-md-5 '
        >
          <div className='row'>
            <div className='col-6'>
              <h2>{t('shelflist')}</h2>
            </div>
            <div className='col-6 add-btn '>
              <div
                onClick={() => {
                  setOpenModal(true);
                }}
                className='btn btn-primary'
              >
                {t('shelfProducts')}
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-6'>
              <Header>{t('allShelf')}</Header>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 450 }} aria-label='simple table'>
                  <TableHead>
                    <TableRow>
                      <TableCell width={50}>#</TableCell>
                      <TableCell width={250}>{t('shelfNumber')}</TableCell>
                      <TableCell width={250}>{t('quantity')}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {shelfAll !== undefined &&
                      shelfAll.map((shelf, index) => (
                        <TableRow
                          key={index}
                          sx={{
                            '&:last-child td, &:last-child th': { border: 0 },
                          }}
                        >
                          <TableCell component='th' scope='row'>
                            {index + 1}
                          </TableCell>
                          <TableCell>{shelf.shelf_number}</TableCell>
                          <TableCell>{shelf.total_products}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            <div className='col-6 '>
              <Header>كل الرف</Header>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 450 }} aria-label='simple table'>
                  <TableHead>
                    <TableRow>
                      <TableCell width={50}>#</TableCell>
                      <TableCell width={150}>{t('shelfNumber')}</TableCell>
                      <TableCell align='center' width={30}>
                        {t('action')}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {shelfAllDetail !== undefined &&
                      shelfAllDetail.map((shelf, index) => (
                        <TableRow
                          key={index}
                          sx={{
                            '&:last-child td, &:last-child th': { border: 0 },
                          }}
                        >
                          <TableCell component='th' scope='row'>
                            {index + 1}
                          </TableCell>
                          <TableCell>{shelf.shelf_number}</TableCell>
                          <TableCell width={30}>
                            <div className='d-flex align-items-center justify-content-around'>
                              <IconButton
                                onClick={() => {
                                  setShelfName(shelf.shelf_number);
                                  setOpenUpdateModal({
                                    open: true,
                                    id: shelf.id,
                                  });
                                }}
                              >
                                <EditIcon />
                              </IconButton>
                              <IconButton>
                                <DeleteIcon
                                  onClick={() => {
                                    dispatch(deleteShelfProduct(shelf.id));
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

export default Shelf;

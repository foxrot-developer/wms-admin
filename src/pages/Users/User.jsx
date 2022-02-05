import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SideBar from '../../components/Dashboard/Sidebar/SideBar';
import { Container, ContentWrap } from '../../components/Global/GlobalStyle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
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
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../store/admin/actions/actionCreators';

const User = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.admin.users);
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
              <h2>المسؤول (ق)</h2>
            </div>
          </div>
          <div className='row'>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 450 }} aria-label='simple table'>
                <TableHead>
                  <TableCell scope='col'>#</TableCell>
                  <TableCell scope='col'>اسم</TableCell>
                  <TableCell scope='col'>اسم االمستخدم</TableCell>
                  <TableCell scope='col'>بريد الالكتروني</TableCell>
                </TableHead>
                <TableBody>
                  {users !== undefined &&
                    users.map((shelf, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell component='th' scope='row'>
                          {index + 1}
                        </TableCell>
                        <TableCell>{shelf.name}</TableCell>
                        <TableCell>{shelf.username}</TableCell>
                        <TableCell>{shelf.email}</TableCell>
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

export default User;

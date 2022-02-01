import React from 'react';
import { Link } from 'react-router-dom';
import {Container, ContentWrap} from './AdminsStyled'
import SideBar from '../../../components/Dashboard/Sidebar/SideBar';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export const Admins = () => {
  return (
  <>
  <Container>
      <ContentWrap>
      <SideBar/>
    <div className='container p-md-5'>
        <div className='row'>
            <div className='col-6'>
                <h2>Admin(s)</h2>
            </div>
            <div className='col-6 add-btn'>
                <Link to='/add-product' className='btn btn-primary'>
                    Add Admin
                </Link>
            </div>
        </div>
        <div className='row'>
            <div className='col'>
                <div className='table-responsive'>
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>John Deo</td>
                            <td>admin@gmail.com</td>
                            <td>
                                <div class='action-btns'>
                                    <Link to='edit-admin'>
                                        <EditIcon  className='edit-btn'/> 
                                    </Link>
                                    <Link to='delete-admin'>
                                        <DeleteIcon  className='del-btn'/>
                                    </Link>
                                </div>
                            </td>
                        </tr>
                        
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    </div>
      </ContentWrap>
  </Container>
 
  </>);
};

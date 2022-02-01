import React from 'react';
import { Link } from 'react-router-dom';
import {Container, ContentWrap} from './StockStyled'
import SideBar from '../../../components/Dashboard/Sidebar/SideBar';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
export const Stock = () => {
  return (
  <>
  <Container>
      <ContentWrap>
      <SideBar/>
    <div className='container p-md-5'>
        <div className='row'>
            <div className='col-6'>
                <h2>Stock</h2>
            </div>
            <div className='col-6 add-btn'>
                <Link to='/add-stock' className='btn btn-primary'>
                    Add Stock
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
                            <th scope="col">Product Name</th>
                            <th scope="col">Quantity</th> 
                            <th scope="col" className="text-center">Actions</th> 
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Car</td>
                            <td>100</td>
                            <td>
                                <div class='action-btns'>
                                    <Link to='edit-stock'>
                                        <EditIcon  className='edit-btn'/> 
                                    </Link>
                                    <Link to='delete-stock'>
                                        <DeleteIcon  className='del-btn'/>
                                    </Link>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">1</th>
                            <td>Bicycle</td>
                            <td>500</td>
                            <td>
                                <div class='action-btns'>
                                    <Link to='edit-stock'>
                                        <EditIcon  className='edit-btn'/> 
                                    </Link>
                                    <Link to='delete-stock'>
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

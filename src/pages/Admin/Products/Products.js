import React from 'react';
import { Link } from 'react-router-dom';
import {Container, ContentWrap} from './ProductsStyled'
import SideBar from '../../../components/Dashboard/Sidebar/SideBar';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
export const Products = () => {
  return (
  <>
  <Container>
      <ContentWrap>
      <SideBar/>
    <div className='container p-md-5'>
        <div className='row'>
            <div className='col-6'>
                <h2>Product(s)</h2>
            </div>
            <div className='col-6 add-btn'>
                <Link to='/add-product' className='btn btn-primary'>
                    Add Product
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
                            <th scope="col">Storage Type</th>
                            <th scope="col">Decription</th>
                            <th scope="col">Price</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Car</td>
                            <td>Normal</td>
                            <td>Toyota car model 2021</td>
                            <td>90000</td>
                            <td>
                                <div class='action-btns'>
                                    <Link to='edit-product'>
                                        <EditIcon  className='edit-btn'/> 
                                    </Link>
                                    <Link to='delete-product'>
                                        <DeleteIcon  className='del-btn'/>
                                    </Link>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Bicycle</td>
                            <td>Normal</td>
                            <td>Best bicycle in the town</td>
                            <td>2500</td>
                            <td>
                                <div class='action-btns'>
                                    <Link to='edit-product'>
                                        <EditIcon className='edit-btn'/> 
                                    </Link>
                                    <Link to='delete-product'>
                                        <DeleteIcon className='del-btn'/>
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

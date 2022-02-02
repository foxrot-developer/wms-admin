import React from 'react';
import SideBar from '../../../../components/Dashboard/Sidebar/SideBar'
import  {Container, ContentWrap} from './AddAdminStyled'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

export const AddAdmin = () => {
    
    const  AddAdminSchema = Yup.object().shape({
        name: Yup.string().required('Product Name Required.'),
        email: Yup.string().email('Invalid Email').required('Email Required.'),
        password: Yup.string().required('Password Required.'),
      });

  return(
    <>
    <Container>
      <ContentWrap>
      <SideBar/>

          <div className='form-container container mt-md-5 mt-4'>
            <div className='form'>
              <div className='title'>
                  <h3>Add Admin</h3>
              </div>
            <Formik
                  initialValues={{
                      name: '',
                      email: '',
                      password: '',
                  }}
                  onSubmit={
                    (val) =>{
                        console.log(val)
                    }
                  }

                  validationSchema={AddAdminSchema}
                >
                  {({ errors, touched }) => (
                  <Form>
                    <div className="mb-3">
                    <Field 
                        className={ `form-control ${errors.name && touched.name && 'invalid' }` }
                        id="name"
                        name="name"
                        type="text"
                        placeholder='Name' 
                    />
                    </div>
                    <div className="mb-3">
                    <Field 
                        className={ `form-control ${errors.email && touched.email && 'invalid' }` }
                        id="email"
                        name="email"
                        type="email"
                        placeholder='Email' 
                    />
                    </div>
                   
                    <div className="mb-3">
                    <Field
                        className={ `form-control ${errors.password && touched.password && 'invalid' }` }
                        id="password"
                        name="password"
                        type="password"
                        placeholder='Password' 
                    />
                    </div>
                    <div className="mb-3">
                        <button type="submit" className='btn btn-primary'>
                            Add Admin
                        </button>
                    </div>
                    
                  
                  {errors.name && touched.name ? (
                      <div  className='error-msg'>{errors.name}</div>
                    ) : null}
                  {errors.email && touched.email ? (
                      <div className='error-msg'>{errors.email}</div>
                  ) : null}
                  {errors.password && touched.password ? (
                      <div className='error-msg'>{errors.password}</div>
                  ) : null}
                 
                </Form>
                )}
                </Formik>
              
            </div>

          </div>
        
        </ContentWrap>
  </Container>
    </>
  ) 
  
};

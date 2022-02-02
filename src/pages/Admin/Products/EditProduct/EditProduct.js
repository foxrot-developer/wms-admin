import React from 'react';
import SideBar from '../../../../components/Dashboard/Sidebar/SideBar'
import  {Container, ContentWrap} from './EditProductStyled'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

export const EditProduct = () => {
    
    const  AddProductSchema = Yup.object().shape({
        name: Yup.string().required('Product Name Required.'),
        price: Yup.string().required('Price Required.'),
        type: Yup.string().required('Storage Type Required.'),
        desc: Yup.string().required('Description Required'),
      });

  return(
    <>
    <Container>
      <ContentWrap>
      <SideBar/>

        <div className='form-container container mt-md-5 mt-4'>
            <div className='form'>
            <div className='title'>
                <h3>Edit Product</h3>
            </div>
            <Formik
                  initialValues={{
                      name: '',
                      price: '',
                      type: '',
                      desc: '',
                      
                  }}
                  onSubmit={
                    (val) =>{
                        console.log(val)
                    }
                  }

                  validationSchema={AddProductSchema}
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
                        className={ `form-control ${errors.price && touched.price && 'invalid' }` }
                        id="price"
                        name="price"
                        type="number"
                        placeholder='Price' 
                    />
                    </div>
                    <div className="mb-3">
                    <Field as="select" 
                        className={ `form-control ${errors.type && touched.type && 'invalid' }` }
                        id="type"
                        name="type" 
                    >
                        <option defaultValue="selected">Select Storage Type</option>
                        <option defaultValue="1">Normal</option>
                        <option defaultValue="2">Medium</option>
                    </Field>
                    </div>
                    <div className="mb-3">
                    <Field as="textarea"
                        className={ `form-control ${errors.desc && touched.desc && 'invalid' }` }
                        id="desc"
                        name="desc"
                        type="text"
                        placeholder='Description' 
                    />
                    </div>
                    <div className="mb-3">
                        <button type="submit" className='btn btn-primary'>
                            Update Product
                        </button>
                    </div>
                    
                  
                  {errors.name && touched.name ? (
                      <div  className='error-msg'>{errors.name}</div>
                    ) : null}
                  {errors.price && touched.price ? (
                      <div className='error-msg'>{errors.price}</div>
                  ) : null}
                  {errors.type && touched.type ? (
                      <div className='error-msg'>{errors.type}</div>
                  ) : null}
                  {errors.desc && touched.desc ? (
                      <div className='error-msg'>{errors.desc}</div>
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

import React from 'react';
import SideBar from '../../../../components/Dashboard/Sidebar/SideBar';
import { Container, ContentWrap } from './EditProductStyled';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

export const EditProduct = () => {
  const AddProductSchema = Yup.object().shape({
    name: Yup.string().required('اسم المنتج مطلوب.'),
    price: Yup.string().required('السعر مطلوب.'),
    type: Yup.string().required('{t('storageType')} مطلوب.'),
    desc: Yup.string().required('الوصف مطلوب.'),
  });

  return (
    <>
      <Container>
        <ContentWrap>
          <SideBar />

          <div className='form-container container mt-md-5 mt-4'>
            <div className='form'>
              <div className='title'>
                <h3>تحرير المنتج</h3>
              </div>
              <Formik
                initialValues={{
                  name: '',
                  price: '',
                  type: '',
                  desc: '',
                }}
                onSubmit={(val) => {
                  console.log(val);
                }}
                validationSchema={AddProductSchema}
              >
                {({ errors, touched }) => (
                  <Form>
                    <div className='mb-3'>
                      <Field
                        className={`form-control ${
                          errors.name && touched.name && 'غير صالحة'
                        }`}
                        id='name'
                        name='name'
                        type='text'
                        placeholder='اسم'
                      />
                    </div>
                    <div className='mb-3'>
                      <Field
                        className={`form-control ${
                          errors.price && touched.price && 'غير صالحة'
                        }`}
                        id='price'
                        name='price'
                        type='number'
                        placeholder='السعر'
                      />
                    </div>
                    <div className='mb-3'>
                      <Field
                        as='select'
                        className={`form-control ${
                          errors.type && touched.type && 'غير صالحة'
                        }`}
                        id='type'
                        name='type'
                      >
                        <option defaultValue='selected'>حدد نوع التخزين</option>
                        <option defaultValue='shelf'>رفوف</option>
                        <option defaultValue='pallet'>البليت</option>
                        <option defaultValue='floor-space'>مساحة أرضية</option>
                      </Field>
                    </div>
                    <div className='mb-3'>
                      <Field
                        as='textarea'
                        className={`form-control ${
                          errors.desc && touched.desc && 'غير صالحة'
                        }`}
                        id='desc'
                        name='desc'
                        type='text'
                        placeholder='وصف'
                      />
                    </div>
                    <div className='mb-3'>
                      <button type='submit' className='btn btn-primary'>
                        تحديث المنتج
                      </button>
                    </div>

                    {errors.name && touched.name ? (
                      <div className='error-msg'>{errors.name}</div>
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
  );
};

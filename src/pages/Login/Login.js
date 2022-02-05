import React, { Fragment } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { admin_login } from '../../store/storeIndex';
import {
  Container,
  ContentWrapper,
  LeftSection,
  RightSection,
  LoginForm,
} from './StyledLogin';

export default function Login() {
  const dispatch = useDispatch();
  const LoginSchema = Yup.object().shape({
    password: Yup.string().required('Password is Required.'),
    email: Yup.string().email('Invalid email').required('Email is Required.'),
  });
  const onSubmitHandler = (data) => {
    dispatch(admin_login(data));
  };
  return (
    <Fragment>
      <Container className='d-flex justify-content-center align-items-center'>
        <ContentWrapper className='d-flex m-auto'>
          <LeftSection className='d-flex flex-column align-items-center justify-content-center'>
            <h3>Login</h3>
            <LoginForm>
              <Formik
                initialValues={{
                  email: '',
                  password: '',
                }}
                onSubmit={onSubmitHandler}
                validationSchema={LoginSchema}
              >
                {({ errors, touched }) => (
                  <Form className='form'>
                    <Field
                      className={`input-field ${
                        errors.email && touched.email && 'invalid'
                      }`}
                      id='email'
                      name='email'
                      type='email'
                      placeholder='بريد الالكتروني'
                    />

                    <Field
                      className={`input-field ${
                        errors.password && touched.password && 'invalid'
                      }`}
                      id='password'
                      name='password'
                      type='password'
                      placeholder='كلمة المرور'
                    />
                    <Field
                      className='input-field'
                      type='submit'
                      value='تسجيل الدخول'
                    />
                    {errors.email && touched.email ? (
                      <div className='error-msg'>{errors.email}</div>
                    ) : null}
                    {errors.password && touched.password ? (
                      <div className='error-msg'>{errors.password}</div>
                    ) : null}
                  </Form>
                )}
              </Formik>
            </LoginForm>
          </LeftSection>
          <RightSection className='d-flex flex-column align-items-center justify-content-center text-center text-white'>
            <h3>مرحبًا بك مجددًا أيها المسؤول!</h3>
          </RightSection>
        </ContentWrapper>
      </Container>
    </Fragment>
  );
}

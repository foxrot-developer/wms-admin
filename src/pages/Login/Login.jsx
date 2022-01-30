import React, { Fragment } from 'react';
import { Container, ContentWrapper, LeftSection, RightSection, LoginForm } from './StyledLogin';
export default function Login() {
  return (
    <Fragment>
        <Container>
          <ContentWrapper>
            <LeftSection>
                <h3>Login</h3>
                <LoginForm>
                    <input type="email" placeholder='Email' />
                    <input type="password" placeholder='Password' />
                    <input type="submit" value="Login"/>
                </LoginForm>
            </LeftSection>
            <RightSection>
                <h3>Welcome Back!</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, autem!</p>
            </RightSection>
          </ContentWrapper>
        </Container>
    </Fragment>
)
}

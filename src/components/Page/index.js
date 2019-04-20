import React from 'react';
import { Container } from 'semantic-ui-react';
import Header from './Header';
import { AuthProvider } from '../../contexts/auth';

const Page = ({ children }) => (
  <AuthProvider>
    <Header />
    <Container style={{ padding: '10rem 0' }}>{children}</Container>
  </AuthProvider>
);

export default Page;

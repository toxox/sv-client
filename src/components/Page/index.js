import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';
import Header from './Header';
import { AuthProvider } from '../../contexts/auth';

const Page = ({ children }) => (
  <AuthProvider>
    <Header />
    <Container style={{ padding: '10rem 0' }}>{children}</Container>
  </AuthProvider>
);

Page.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Page;

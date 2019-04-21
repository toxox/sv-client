import React from 'react';
import { Link } from '@reach/router';
import { Container, Menu, Dropdown } from 'semantic-ui-react';
import { GoogleLogin } from 'react-google-login';
import { AuthConsumer } from '../../../contexts/auth';
import './styles.scss';

const AppHeader = () => (
  <AuthConsumer>
    {({ user, isFetching, login, logout }) => {
      return (
        <Menu fixed="top" inverted color="violet" size="large" id="header">
          <Container id="container">
            <Menu.Item header>
              <Link to="/">Stream Viewer</Link>
            </Menu.Item>

            {user ? (
              <Menu.Menu position="right">
                <Dropdown item text={user.nickname}>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Menu.Menu>
            ) : (
              <Menu.Item position="right">
                <GoogleLogin
                  clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                  buttonText="Login"
                  onSuccess={login}
                  onFailure={() => {}}
                  cookiePolicy="single_host_origin"
                  disabled={isFetching}
                />
              </Menu.Item>
            )}
          </Container>
        </Menu>
      );
    }}
  </AuthConsumer>
);

export default AppHeader;

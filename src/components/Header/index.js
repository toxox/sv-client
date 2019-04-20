import React from 'react';
import { Link } from '@reach/router';
import { Container, Menu, Button } from 'semantic-ui-react';
import { GoogleLogin } from 'react-google-login';
import { AuthConsumer } from '../../contexts/auth';

const AppHeader = () => (
  <AuthConsumer>
    {({ user, isFetching, login, logout }) => {
      return (
        <Menu fixed="top" inverted color="violet" size="large">
          <Container
            style={{
              minHeight: '72px',
            }}
          >
            <Menu.Item header>
              <Link to="/">Stream Viewer</Link>
            </Menu.Item>

            {user ? (
              <Menu.Item position="right">
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                    minWidth: '200px',
                  }}
                >
                  <strong>{user.nickname}</strong>
                  <div>
                    <Button inverted type="button" onClick={logout}>
                      Log Out
                    </Button>
                  </div>
                </div>
              </Menu.Item>
            ) : (
              <Menu.Item position="right">
                <GoogleLogin
                  clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                  buttonText="Login"
                  onSuccess={login}
                  onFailure={() => {}}
                  cookiePolicy="single_host_origin"
                  style={{
                    height: '10px',
                    maxHeight: '10px',
                    background: 'green',
                  }}
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

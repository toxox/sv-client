import React from 'react';
import { Router } from '@reach/router';
import Page from '../Page';
import Dashboard from '../Dashboard';
import Room from '../Room';

const App = () => {
  return (
    <Page>
      <Router>
        <Dashboard path="/" />
        <Room path="room/:videoId" />
      </Router>
    </Page>
  );
};

export default App;

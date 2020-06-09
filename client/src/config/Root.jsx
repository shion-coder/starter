import React from 'react';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from 'redux/store';

import { BrowserRouter as Router } from 'react-router-dom';

import GlobalStyle from 'utils/styles/global';

import App from 'containers/app/app.container';

/* -------------------------------------------------------------------------- */

const Root = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <GlobalStyle />

      <Router>
        <App />
      </Router>
    </PersistGate>
  </Provider>
);

export default Root;

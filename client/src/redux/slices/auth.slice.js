import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';
import decode from 'jwt-decode';
import isEmpty from 'lodash-es/isEmpty';

import setToken from 'utils/helper/set-token';

/* -------------------------------------------------------------------------- */

/**
 * Register new user
 *
 * @param {object} user User information.
 * @param {function} history History function of react router dom.
 */
export const register = createAsyncThunk('auth/register', async user => {
  const { data } = await axios.post('/api/users/register', user).catch(err => {
    throw new Error(err);
  });

  if (data.errors) {
    throw new Error(JSON.stringify(data.errors));
  }

  return data;
});

/**
 * Login
 *
 * @param {object} user User information.
 * @param {function} history History function of react router dom.
 */
export const login = createAsyncThunk('auth/login', async user => {
  const { data } = await axios.post('/api/users/login', user).catch(err => {
    throw new Error(err);
  });

  if (data.errors) {
    throw new Error(JSON.stringify(data.errors));
  }

  return data;
});

// Create Slice
const authSlice = createSlice({
  name: 'auth',
  initialState: { isAuthenticated: false, user: {} },
  reducers: {
    setCurrentUser: (state, { payload }) => {
      state.isAuthenticated = !isEmpty(payload);
      state.user = payload;
    },
    logout: state => {
      localStorage.removeItem('token');

      state.isAuthenticated = false;
      state.user = {};

      setToken(false);
    },
  },
  extraReducers: {
    [register.fulfilled]: (state, { payload: { token } }) => {
      localStorage.setItem('token', token);

      setToken(token);

      const decoded = decode(token);

      state.isAuthenticated = !isEmpty(decoded);
      state.user = decoded;
    },
    [login.fulfilled]: (state, { payload: { token } }) => {
      localStorage.setItem('token', token);

      setToken(token);

      const decoded = decode(token);

      state.isAuthenticated = !isEmpty(decoded);
      state.user = decoded;
    },
  },
});

export const { setCurrentUser, logout } = authSlice.actions;

export default authSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

import { register, login } from './auth.slice';

/* -------------------------------------------------------------------------- */

// Create Slice
const errorsSlice = createSlice({
  name: 'errors',
  initialState: {},
  reducers: {
    createErrors: (state, action) => action.payload,
    clearErrors: () => ({}),
  },
  extraReducers: {
    [register.rejected]: (state, action) => JSON.parse(action.error.message),
    [login.rejected]: (state, action) => JSON.parse(action.error.message),
  },
});

export const { createErrors, clearErrors } = errorsSlice.actions;

export default errorsSlice.reducer;

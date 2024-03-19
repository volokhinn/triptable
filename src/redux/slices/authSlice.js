import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginRequest } from '../../api/api';

const initialState = {
  error: null,
};

export const login = createAsyncThunk('auth/login', async (userData) => {
  try {
    return await loginRequest(userData);
  } catch (error) {
    throw Error(error);
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;

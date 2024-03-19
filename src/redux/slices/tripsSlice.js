// tripSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTrips = createAsyncThunk('trips/fetchTrips', async (token) => {
  try {
    const response = await axios.get(
      'https://transstage1.iwayex.com/transnextgen/v3/orders/trips',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data.result.orders;
  } catch (error) {
    throw Error(error.response.data);
  }
});

const tripSlice = createSlice({
  name: 'trips',
  initialState: {
    trips: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrips.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrips.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchTrips.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default tripSlice.reducer;

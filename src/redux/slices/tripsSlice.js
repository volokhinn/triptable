import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTripsByPage = createAsyncThunk(
  'trips/fetchTripsByPage',
  async ({ token, page }) => {
    try {
      const response = await axios.get(
        `https://transstage1.iwayex.com/transnextgen/v3/orders/trips?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(response);
      return {
        trips: response.data.result.orders,
        pageData: response.data.result.page_data,
      };
    } catch (error) {
      throw Error(error.response.data);
    }
  },
);

const tripSlice = createSlice({
  name: 'trips',
  initialState: {
    trips: [],
    pageData: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTripsByPage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTripsByPage.fulfilled, (state, action) => {
        state.loading = false;
        state.trips = action.payload.trips;
        state.pageData = action.payload.pageData;
      })

      .addCase(fetchTripsByPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default tripSlice.reducer;

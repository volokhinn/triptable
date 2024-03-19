import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTrips } from '../../api/api';

export const fetchTripsByPageAndFilters = createAsyncThunk(
  'trips/fetchTripsByPageAndFilters',
  async ({ token, page, names, email, order_status }) => {
    return await fetchTrips({ token, page, names, email, order_status });
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
      .addCase(fetchTripsByPageAndFilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTripsByPageAndFilters.fulfilled, (state, action) => {
        state.loading = false;
        state.trips = action.payload.trips;
        state.pageData = action.payload.pageData;
      })
      .addCase(fetchTripsByPageAndFilters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default tripSlice.reducer;

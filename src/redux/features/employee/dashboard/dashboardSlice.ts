import { createSlice } from '@reduxjs/toolkit';

interface DashboardState {
  refetch: boolean;
}

const initialState: DashboardState = {
  refetch: false,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    triggerRefetch: (state) => {
      state.refetch = !state.refetch;
    },
  },
});

export const { triggerRefetch } = dashboardSlice.actions;

export default dashboardSlice.reducer;

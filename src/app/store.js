import { configureStore } from '@reduxjs/toolkit';
import valueSlice from '../features/api/callSlice';

export const store = configureStore({
  reducer: {
    financeData: valueSlice,
  },
});

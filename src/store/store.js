import { configureStore } from '@reduxjs/toolkit'
import { journalSlice } from './journal/journalSlice'
import { authSlice } from './slice/auth'


export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    journal: journalSlice.reducer
  },
})
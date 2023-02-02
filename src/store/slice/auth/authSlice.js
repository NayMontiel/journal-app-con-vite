import { createSlice } from "@reduxjs/toolkit";
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "checking", // , , 
    uid: null,
    email: null,
    photoURL: null,
    displayName: null,
    errorMessage: null, 
  },
  reducers: {
    login: (state, action) => {
        state.status= "authenticated"; 
        state.uid= action.payload.uid;
        state.email= action.payload.email;
        state.photoURL= action.payload.photoURL;
        state.displayName= action.payload.displayName;
        state.errorMessage= null; 
    },
    logout: (state, action) => {
        state.status= "not-authenticated";
        state.uid= null;
        state.email= null;
        state.photoURL= null;
        state.displayName= null;
        state.errorMessage= action.payload?.errorMessage; 
     
    },
    checkingCredentials: (state) => {
        state.status = 'checking';
    },
  },
});

export const { login, logout, checkingCredentials } = authSlice.actions;

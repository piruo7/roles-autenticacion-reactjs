import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  token: localStorage.getItem( 'token' ) || null,
  role: null,
};

export const usersSlice = createSlice( {
  name: 'users',
  initialState,
  reducers: {
    setAuth: ( state, action ) => {
      state.token = action.payload.token;
      state.role = action.payload.role;
      localStorage.setItem( 'token', action.payload.token );
    },
    clearAuth: ( state ) => {
      state.token = null;
      state.role = null;
      localStorage.removeItem( 'token' );
    },
    setUsers: ( state, action ) => {
      state.users = action.payload;
    },
    deleteUser: ( state, action ) => {
      state.users = state.users.filter( ( user ) => user.id !== action.payload );
    },
  },
} );

export const { setAuth, clearAuth, setUsers, deleteUser } = usersSlice.actions;
export default usersSlice.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { FetchData, createNewUser, createNewValue, deleteValue, loginUser } from './counterApi';

const initialState = {
  data: [],
  user: createInitialState(),
  guest: initialStateGuest(),
  currency: 'USD',
  status: 'idle',
  currentSelect: null,
  categorie: [
    'Without category',
    'Salary',
    'Other income',
    'Rent',
    'Services',
    'Taxes',
    'unexpected',
  ],
  categoryFilter: null,
};

function createInitialState() {
  const user = localStorage.getItem('user');

  if (user === 'undefined') {
    return null;
  }
  return {
      // initialize state from local storage to enable user to stay logged in
      profile: JSON.parse(user),
      error: null,
  };
};

function initialStateGuest() {
  const guest = localStorage.getItem('guest');

  if (guest === 'undefined') {
    return null;
  }
  return {
      // initialize state from local storage to enable user to stay logged in
      profile: JSON.parse(guest),
      error: null,
  };
};

export const postUser = createAsyncThunk('user/post', async (value) => {
  const response = await loginUser(value);
  return response;
});

export const postCreateUser = createAsyncThunk('create/post', async (value) => {
  const response = await createNewUser(value);
  return response;
});

export const fetchValue = createAsyncThunk('data/fetch', async (value) => {
  const response = await FetchData(value);
  return response;
});

export const postValue = createAsyncThunk('data/create', async (value) => {
  const response = await createNewValue(value);
  return response;
});

export const deleteOneValue = createAsyncThunk(
  'data/delete',
  async (id) => {
    const response = await deleteValue(id);
    return response;
  }
);

export const valueSlice = createSlice({
  name: 'financeData',
  initialState,
  reducers: {
    setCurrentData: (state, action) => {
      state.currentSelect = action.payload;
    },
    setCategoryFilters: (state, action) => {
      state.categoryFilter = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // .addCase(fetchValue.pending, (state) => {
      //   state.status = 'loading';
      // })
      .addCase(fetchValue.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(postUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(postUser.fulfilled, (state, action) => {
        state.status = 'finish';
        const user = action.payload;
        localStorage.setItem('user', JSON.stringify(user.profile));
        state.user = user;
      })
      .addCase(postUser.rejected, (state, action) => {
        state.status = 'error';
      })
      .addCase(postValue.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(postValue.fulfilled, (state, action) => {
        state.status = 'finish';
        state.data.push(action.payload);
      })
      .addCase(postValue.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(deleteOneValue.fulfilled, (state, action) => {
        state.state = 'finish';
        state.data.pop(action.payload)
      });
  },
});

export const { setCurrentData, setCategoryFilters } = valueSlice.actions;

export default valueSlice.reducer;

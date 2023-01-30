import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  FetchCategorie,
  // FetchData,
  FetchRoster,
  createCategorie,
  createNewUser,
  createNewValue,
  createRoster,
  deleteValue,
  loginUser,
  updateUser,
} from './counterApi';

const initialState = {
  data: [],
  roster: [],
  user: createInitialState(),
  guest: initialStateGuest(),
  currency: 'USD',
  status: 'idle',
  currentSelect: null,
  categorie: [],
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
}

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
}

export const postUser = createAsyncThunk('user/post', async (value) => {
  const response = await loginUser(value);
  return response;
});

export const postCreateUser = createAsyncThunk('create/post', async (value) => {
  const response = await createNewUser(value);
  return response;
});

export const pathUpdateUser = createAsyncThunk('update/path', async (value) => {
  const response = await updateUser(value);
  return response;
});

export const fetchRoster = createAsyncThunk('roster/fetch', async (value) => {
  const response = await FetchRoster(value);
  return response;
});

// export const fetchValue = createAsyncThunk('data/fetch', async (value) => {
//   const response = await FetchData(value);
//   return response;
// });

export const fetchCategorie = createAsyncThunk(
  'categorie/fetch',
  async (value) => {
    const response = await FetchCategorie(value);
    return response;
  }
);

export const postCategorie = createAsyncThunk(
  'categorie/create',
  async (value) => {
    const response = await createCategorie(value);
    return response;
  }
);

export const postRoster = createAsyncThunk(
  'roster/create',
  async (value) => {
    const response = await createRoster(value);
    return response;
  }
);

export const postValue = createAsyncThunk('data/create', async (value) => {
  const response = await createNewValue(value);
  return response;
});

export const deleteOneValue = createAsyncThunk('data/delete', async (id) => {
  const response = await deleteValue(id);
  return response;
});

export const valueSlice = createSlice({
  name: 'financeData',
  initialState,
  reducers: {
    setCurrentData: (state, action) => {
      state.currentSelect = action.payload;
    },
    setCategoryFilters: (state, action) => {
      state.categoryFilter = action.payload;
    },
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // .addCase(fetchValue.fulfilled, (state, action) => {
      //   state.data = action.payload;
      // })
      .addCase(fetchRoster.fulfilled, (state, action) => {
        state.roster = action.payload;
      })
      .addCase(fetchCategorie.fulfilled, (state, action) => {
        state.categorie = action.payload;
      })
      .addCase(postUser.rejected, (state) => {
        state.status = 'error';
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
      // .addCase(pathUpdateUser.fulfilled, (state, action) => {
      //   state.status = 'finish';
      //   const userActive = action.payload;
      //   state.user = userActive;
      // })
      .addCase(postCategorie.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(postCategorie.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(postCategorie.fulfilled, (state, action) => {
        state.status = 'finish';
        state.categorie.push(action.payload);
      })
      .addCase(postRoster.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(postRoster.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(postRoster.fulfilled, (state) => {
        state.status = 'finish';
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
        state.data.pop(action.payload);
      });
  },
});

export const { setCurrentData, setCategoryFilters, reset } = valueSlice.actions;

export default valueSlice.reducer;

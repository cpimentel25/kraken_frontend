import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  FetchData,
  FetchRoster,
  FetchTotal,
  createNewUser,
  createNewValue,
  createRoster,
  deleteValue,
  lastFiveValueRoster,
  lastValueRoster,
  loginUser,
  updateUser,
} from './counterApi';

const initialState = {
  data: [],
  roster: [],
  totalValues: null,
  lastValue: null,
  lastFiveRoster: null,
  currentRoster: null,
  settingRoster: null,
  sendData: null,
  user: createInitialState(),
  userActive: null,
  guest: initialStateGuest(),
  currency: 'USD',
  status: 'idle',
  currentSelect: null,
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

export const fetchValue = createAsyncThunk('data/fetch', async (value) => {
  const response = await FetchData(value);
  return response;
});

export const fetchTotal = createAsyncThunk(
  'rosterTotalValue/fetch',
  async (value) => {
    const response = await FetchTotal(value);
    return response;
  }
);

export const fetchLastValue = createAsyncThunk(
  'lastValueRoster/fetch',
  async (value) => {
    const response = await lastValueRoster(value);
    return response;
  }
);

export const fetchLastFive = createAsyncThunk(
  'lastFives/fetch',
  async (value) => {
    const response = await lastFiveValueRoster(value);
    return response;
  }
);

export const postRoster = createAsyncThunk('roster/create', async (value) => {
  const response = await createRoster(value);
  return response;
});

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
    setCurrentRoster: (state, action) => {
      state.currentRoster = action.payload;
    },
    setCurrentData: (state, action) => {
      state.currentSelect = action.payload;
    },
    setCategoryFilters: (state, action) => {
      state.categoryFilter = action.payload;
    },
    reset: () => initialState,
    setRosterSetting: (state, action) => {
      state.settingRoster = action.payload;
    },
    setActiveUser: (state, action) => {
      state.userActive = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchValue.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(fetchRoster.fulfilled, (state, action) => {
        state.roster = action.payload;
      })
      .addCase(fetchTotal.fulfilled, (state, action) => {
        state.totalValues = action.payload[0];
      })
      .addCase(fetchLastValue.fulfilled, (state, action) => {
        state.lastValue = action.payload?.values[0];
      })
      .addCase(fetchLastFive.fulfilled, (state, action) => {
        state.lastFiveRoster = action.payload;
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
        state.sendData = action.payload.values;
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

export const {
  setCurrentRoster,
  setCurrentData,
  setCategoryFilters,
  reset,
  setRosterSetting,
  setActiveUser,
} = valueSlice.actions;

export default valueSlice.reducer;

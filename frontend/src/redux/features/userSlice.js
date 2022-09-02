import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "./../api";

export const login = createAsyncThunk(
  "user/login",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.login(formData);
      return response.data;
    } catch (error) {
      console.error(error.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const register = createAsyncThunk(
  "user/register",
  async (formValue, { rejectWithValue }) => {
    try {
      const response = await api.register(formValue);
      return response.data;
    } catch (error) {
      console.error(error.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "user/update/profile",
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await api.updateProfile(profileData);
      // console.log(response);
      return response.data;
    } catch (error) {
      console.error(error.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updatePassword = createAsyncThunk(
  "user/update/password",
  async (passwordData, { rejectWithValue }) => {
    try {
      const response = await api.updatePassword(passwordData);
      // console.log(response);
      return response.data;
    } catch (error) {
      console.error(error.message);
      return rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    loading: false,
    isLoggedIn: false,
    isUpdated: false,
    error: "",
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    setLogout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      localStorage.removeItem("token");
    },
  },

  extraReducers: {
    [login.pending]: (state) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isLoggedIn = true;
      state.user = payload;
      localStorage.setItem("token", JSON.stringify({ ...payload }));
    },
    [login.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [register.pending]: (state) => {
      state.loading = true;
    },
    [register.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.user = payload;
      localStorage.setItem("token", JSON.stringify({ ...payload }));

      state.isLoggedIn = true;
    },
    [register.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [updateProfile.pending]: (state) => {
      state.loading = true;
    },
    [updateProfile.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.user = payload;
      localStorage.setItem("token", JSON.stringify({ ...payload }));
      state.isUpdated = true;
      state.isLoggedIn = true;
    },
    [updateProfile.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [updatePassword.pending]: (state) => {
      state.loading = true;
    },
    [updatePassword.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.user = payload;
      localStorage.setItem("token", JSON.stringify({ ...payload }));
      state.isUpdated = true;
      state.isLoggedIn = true;
    },
    [updatePassword.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { setUser, setLogout } = userSlice.actions;
export default userSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  AuthUserType,
  CreateUserType,
  LoginUserType,
} from "../types/authTypes";
import axios from "../utils/customFetch";
import { AxiosError } from "axios";

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/auth/getCurrentUser");
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(error.message);
      } else {
        return thunkAPI.rejectWithValue("An unknown error occurred");
      }
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (registerData: CreateUserType, thunkAPI) => {
    try {
      await axios.post("/auth/register", registerData);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(error.message);
      } else {
        return thunkAPI.rejectWithValue("An unknown error occurred");
      }
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (loginData: LoginUserType, thunkAPI) => {
    try {
      await axios.post("/auth/login", loginData);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(error.message);
      } else {
        return thunkAPI.rejectWithValue("An unknown error occurred");
      }
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axios.post("/auth/logout");
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      return thunkAPI.rejectWithValue(error.message);
    } else {
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
});

export interface AuthState {
  authUser: AuthUserType | null;
  isLoading: boolean;
  error: string | null;
  success: string | null;
}

const initialState: AuthState = {
  authUser: null,
  isLoading: false,
  error: null,
  success: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.authUser = action.payload;
        state.success = "User logged in successfully";
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.isLoading = false;
        state.success = null;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.isLoading = false;
        state.success = "User registered successfully";
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.success = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(login.fulfilled, (state) => {
        state.isLoading = false;
        state.success = "User logged in successfully";
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.success = null;
        state.error = action.payload as string;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.authUser = null;
        state.success = "User logged out successfully";
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.success = null;
        state.error = action.payload as string;
      });
  },
});

export default authSlice.reducer;
export const { clearError } = authSlice.actions;

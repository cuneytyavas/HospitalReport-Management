import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  CreateTechnicianType,
  UpdateTechnicianType,
  TechnicianType,
} from "../types/technicianTypes";
import axios from "../utils/customFetch";
import { AxiosError } from "axios";

export const fetchAllTechnicians = createAsyncThunk(
  "technician/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/technician");
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

export const fetchTechnicianById = createAsyncThunk(
  "technician/fetchById",
  async (id: string, thunkAPI) => {
    try {
      const response = await axios.get(`/technician/${id}`);
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

export const createTechnician = createAsyncThunk(
  "technician/create",
  async (technicianData: CreateTechnicianType, thunkAPI) => {
    try {
      const response = await axios.post("/technician/create", technicianData);
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

export const updateTechnician = createAsyncThunk(
  "technician/update",
  async (
    {
      id,
      updatedData,
    }: { id: string | undefined; updatedData: UpdateTechnicianType },
    thunkAPI
  ) => {
    try {
      const response = await axios.patch(
        `/technician/update/${id}`,
        updatedData
      );
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

export const deleteTechnician = createAsyncThunk(
  "technician/delete",
  async (id: string, thunkAPI) => {
    try {
      await axios.delete(`/technician/delete/${id}`);
      return id;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(error.message);
      } else {
        return thunkAPI.rejectWithValue("An unknown error occurred");
      }
    }
  }
);

interface TechnicianState {
  technicians: TechnicianType[];
  technician: TechnicianType;
  isLoading: boolean;
  error: string | null;
  success: string | null;
}
const initialState: TechnicianState = {
  technicians: [],
  technician: {} as TechnicianType,
  isLoading: false,
  error: null,
  success: null,
};

const technicianSlice = createSlice({
  name: "technician",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTechnicians.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllTechnicians.fulfilled, (state, action) => {
        state.isLoading = false;
        state.technicians = action.payload;
      })
      .addCase(fetchAllTechnicians.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(createTechnician.pending, (state) => {
        state.isLoading = true;
        state.success = null;
        state.error = null;
      })
      .addCase(createTechnician.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = "Laborant successfully created";
        state.technicians.push(action.payload);
      })
      .addCase(createTechnician.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteTechnician.pending, (state) => {
        state.isLoading = true;
        state.success = null;
        state.error = null;
      })
      .addCase(deleteTechnician.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = "Laborant başarıyla silindi";
        state.technicians = state.technicians.filter(
          (technician) => technician._id !== action.payload
        );
      })
      .addCase(deleteTechnician.rejected, (state, action) => {
        state.isLoading = false;
        state.success = null;
        state.error = action.payload as string;
      })
      .addCase(fetchTechnicianById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTechnicianById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.technician = action.payload;
      })
      .addCase(fetchTechnicianById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});
export default technicianSlice.reducer;
export const { clearError } = technicianSlice.actions;

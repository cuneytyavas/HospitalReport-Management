import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "../utils/customFetch";
import {
  RecordType,
  CreateRecordType,
  UpdateRecordType,
} from "../types/recordTypes";
import { AxiosError } from "axios";

export const fetchAllRecords = createAsyncThunk(
  "record/fetchAll",
  async (
    queryParams: {
      patientName?: string;
      patientSurname?: string;
      patientTcId?: string;
      technicianName?: string;
      technicianSurname?: string;
      oldest?: boolean;
      newest?: boolean;
    },
    thunkAPI
  ) => {
    try {
      const response = await axios.get("/record", { params: queryParams });
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

export const fetchRecordById = createAsyncThunk(
  "record/fetchById",
  async (id: string, thunkAPI) => {
    try {
      const response = await axios.get(`/record/${id}`);
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

export const createRecord = createAsyncThunk(
  "record/create",
  async (recordData: CreateRecordType, thunkAPI) => {
    try {
      const response = await axios.post("/record/create", recordData);
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

export const updateRecord = createAsyncThunk(
  "record/update",
  async (
    { id, updatedData }: { id: string; updatedData: UpdateRecordType },
    thunkAPI
  ) => {
    try {
      const response = await axios.patch(`/record/update/${id}`, updatedData);
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

export const deleteRecord = createAsyncThunk(
  "record/delete",
  async (id: string, thunkAPI) => {
    try {
      await axios.delete(`/record/delete/${id}`);
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

interface RecordState {
  records: RecordType[];
  record: RecordType | object;
  isLoading: boolean;
  error: string | null;
  success: null | string;
}

const initialState: RecordState = {
  records: [],
  record: {},
  isLoading: false,
  error: null,
  success: null,
};

const recordSlice = createSlice({
  name: "record",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearRecords: (state) => {
      state.records = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllRecords.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchAllRecords.fulfilled,
        (state, action: PayloadAction<RecordType[] | []>) => {
          state.isLoading = false;
          state.records = action.payload || [];
        }
      )
      .addCase(fetchAllRecords.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchRecordById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchRecordById.fulfilled,
        (state, action: PayloadAction<RecordType>) => {
          state.isLoading = false;
          state.record = action.payload;
        }
      )
      .addCase(fetchRecordById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(createRecord.pending, (state) => {
        state.isLoading = true;
        state.success = null;
        state.error = null;
      })
      .addCase(createRecord.fulfilled, (state) => {
        state.isLoading = false;
        state.success = "Rapor başarıyla oluşturuldu";
      })
      .addCase(createRecord.rejected, (state, action) => {
        state.isLoading = false;
        state.success = null;
        state.error = action.payload as string;
      })
      .addCase(updateRecord.pending, (state) => {
        state.isLoading = true;
        state.success = null;
        state.error = null;
      })
      .addCase(
        updateRecord.fulfilled,
        (state, action: PayloadAction<RecordType>) => {
          state.success = "Rapor başarıyla güncellendi";
          state.isLoading = false;
          state.records = state.records.map((rec) =>
            rec._id === action.payload._id ? action.payload : rec
          );
        }
      )
      .addCase(updateRecord.rejected, (state, action) => {
        state.isLoading = false;
        state.success = null;
        state.error = action.payload as string;
      })
      .addCase(deleteRecord.pending, (state) => {
        state.isLoading = true;
        state.success = null;
        state.error = null;
      })
      .addCase(
        deleteRecord.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.success = "Rapor başarıyla silindi";
          state.isLoading = false;
          state.records = state.records.filter(
            (rec) => rec._id !== action.payload
          );
        }
      )
      .addCase(deleteRecord.rejected, (state, action) => {
        state.isLoading = false;
        state.success = null;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearRecords } = recordSlice.actions;
export default recordSlice.reducer;

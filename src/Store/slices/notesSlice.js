import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../BaseURL";
import axios from "axios";



export const fetchNotes = createAsyncThunk(
  "notes/fetchNotes", // 
  async () => {
    const response = await axios.get(`${BASE_URL}/notes`);
    return response.data;
  }
);

export const addNotes = createAsyncThunk(
  "notes/addNotes",
  async (notesData) => {
    try {
      const response = await axios.post(`${BASE_URL}/notes`, notesData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response.data;
    } catch (error) {
      console.error("Server error response:", error.response?.data);
      throw error;
    }
  }
);

const initialState = {
  notes: [],
  status: "idle",
  error: null,
};

const notesSlices = createSlice({
  name: "notes",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.notes = action.payload;
        state.error = null;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default notesSlices.reducer;

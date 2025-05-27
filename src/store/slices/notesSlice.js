import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk to fetch notes
export const fetchNotes = createAsyncThunk("notes/fetchNotes", async () => {
  const response = await axios.get("http://localhost:3001/api/notes");
  return response.data;
});

const notesSlice = createSlice({
  name: "notes",
  initialState: {
    notes: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = action.payload;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = "Failed to fetch notes";
      });
  },
});

export default notesSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3001/api/notes";


export const fetchNote = createAsyncThunk(
  "note/fetchNote",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch notes",
      );
    }
  },
);

export const addNoteThunk = createAsyncThunk(
  "note/addNoteThunk",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create note",
      );
    }
  },
);

export const deleteNoteThunk = createAsyncThunk(
  "note/deleteNoteThunk",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return id; 
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete note",
      );
    }
  },
);

const initialState = {
  Note: [], 
  loading: false,
  error: null,
};

const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Notes
      .addCase(fetchNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNote.fulfilled, (state, action) => {
        state.loading = false;
        state.Note = action.payload;
      })
      .addCase(fetchNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add Note
      .addCase(addNoteThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(addNoteThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.Note.unshift(action.payload); 
      })
      .addCase(addNoteThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Note
      .addCase(deleteNoteThunk.fulfilled, (state, action) => {
        state.Note = state.Note.filter((note) => note.id !== action.payload);
      });
  },
});

export default noteSlice.reducer;

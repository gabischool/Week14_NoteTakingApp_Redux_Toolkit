// ✅ notesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// 📌 Base API URL
const API_URL = 'http://localhost:3001/api/notes';

// 🧠 Initial State
const initialState = {
  notes: [],
  loading: false,
  error: null,
};

// ✅ Async thunk: Fetch notes from API
export const fetchNotes = createAsyncThunk(
  'notes/fetchNotes',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// ✅ Async thunk: Add a new note
export const addNote = createAsyncThunk(
  'notes/addNote',
  async (noteData, thunkAPI) => {
    try {
      const response = await axios.post(API_URL, noteData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// ✅ Async thunk: Delete a note
export const deleteNote = createAsyncThunk(
  'notes/deleteNote',
  async (id, thunkAPI) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// ✅ Async thunk: Update a note
export const updateNote = createAsyncThunk(
  'notes/updateNote',
  async ({ id, updatedData }, thunkAPI) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// 🧩 Create notes slice
const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 📦 fetchNotes handlers
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
        state.error = action.payload;
      })

      // 📦 addNote handlers
      .addCase(addNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNote.fulfilled, (state, action) => {
        state.loading = false;
        state.notes.push(action.payload);
      })
      .addCase(addNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 📦 deleteNote handlers
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.notes = state.notes.filter((note) => note.id !== action.payload);
      })

      // 📦 updateNote handlers
      .addCase(updateNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.notes.findIndex((note) => note.id === action.payload.id);
        if (index !== -1) {
          state.notes[index] = action.payload;
        }
      })
      .addCase(updateNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// ✅ Export reducer
export default notesSlice.reducer;

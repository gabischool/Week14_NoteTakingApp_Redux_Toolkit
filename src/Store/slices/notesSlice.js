import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Base_URL } from '../BaseURL';

// ✅ Fetch notes
export const fetchNotes = createAsyncThunk(
  "notes/fetchNotes",
  async () => {
    const response = await axios.get(`${Base_URL}/notes`);
    return response.data;
  }
);

// ✅ Add note
export const addNote = createAsyncThunk(
  "notes/addNote",
  async (noteData) => {
    const response = await axios.post(`${Base_URL}/notes`, noteData);
    return response.data; // note with id
  }
);

// ✅ Delete note
export const deleteNote = createAsyncThunk(
  "notes/deleteNote",
  async (id) => {
    await axios.delete(`${Base_URL}/notes/${id}`);
    return id;
  }
);

// Initial state
const initialState = {
  notes: [],
  status: 'idle',
  error: null
};

// Create slice
const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch notes
      .addCase(fetchNotes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.notes = action.payload;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Add note
      .addCase(addNote.fulfilled, (state, action) => {
        state.notes.push(action.payload);
      })

      // Delete note
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.notes = state.notes.filter(note => note.id !== action.payload);
      });
  }
});

export default notesSlice.reducer;

// ✅ 1. Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// ✅ 2. Thunks

// 🔄 Thunk to fetch all notes
export const fetchNotes = createAsyncThunk('notes/fetchNotes', async () => {
  const response = await axios.get('http://localhost:3001/api/notes');
  return response.data;
});

// ➕ Thunk to add a new note
export const addNote = createAsyncThunk('notes/addNote', async (newNote) => {
  const response = await axios.post('http://localhost:3001/api/notes', newNote);
  return response.data;
});

// 🗑️ ✅ INSERT THIS Thunk just below addNote
export const deleteNote = createAsyncThunk('notes/deleteNote', async (id) => {
  await axios.delete(`http://localhost:3001/api/notes/${id}`);
  return id;
});

// ✅ 3. Initial State
const initialState = {
  notes: [],
  loading: false,
  error: null,
};

// ✅ 4. Slice
const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchNotes
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
        state.error = action.error.message;
      })

      // addNote
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
        state.error = action.error.message;
      })

      // 🗑️ ✅ INSERT THIS deleteNote handler at the end
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.notes = state.notes.filter((note) => note.id !== action.payload);
      });
  },
});

// ✅ 5. Export the reducer
export default notesSlice.reducer;



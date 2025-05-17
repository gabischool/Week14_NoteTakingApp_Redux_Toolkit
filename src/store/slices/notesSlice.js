import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all notes
export const fetchNotes = createAsyncThunk("notes/fetchNotes", async () => {
  const res = await axios.get("http://localhost:3001/api/notes");
  return res.data;
});

// Add a new note
export const addNote = createAsyncThunk("notes/addNote", async (noteData) => {
  const res = await axios.post("http://localhost:3001/api/notes", noteData);
  return res.data;
});

// Delete a note by ID
export const deleteNote = createAsyncThunk(
  "notes/deleteNote",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:3001/api/notes/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice definition
const notesSlice = createSlice({
  name: "notes",
  initialState: {
    notes: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // Fetch Notes
      .addCase(fetchNotes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.notes = action.payload;
        state.loading = false;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Add Note
      .addCase(addNote.fulfilled, (state, action) => {
        state.notes.push(action.payload);
      })

      // Delete Note
      .addCase(deleteNote.pending, (state) => {
        state.error = null;
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.notes = state.notes.filter(note => note.id !== action.payload);
      })
      .addCase(deleteNote.rejected, (state, action) => {
        state.error = action.payload || "Failed to delete the note";
      });
  },
});

export default notesSlice.reducer;

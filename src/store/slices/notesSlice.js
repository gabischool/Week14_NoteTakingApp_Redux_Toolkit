import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../BaseUrl";

// Async thunk to fetch notes from an API
export const fetchNotes = createAsyncThunk(
    "notes/fetchNotes", 
    async () => {
  const response = await axios.get(`${BASE_URL}/notes`);
  return response.data;
});

// Async thunk to add a new note
export const addNote = createAsyncThunk(
    "notes/addNote", 
    async (note) => {
  const response = await axios.post(`${BASE_URL}/notes`, note);
  return response.data;
});


// async thunk to delete a note
export const deleteNote = createAsyncThunk(
    "notes/deleteNote",
    async (noteId) => {
  await axios.delete(`${BASE_URL}/notes/${noteId}`);
  return noteId;
});


// initial state
const initialState = {
  notes: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Create the notes slice
const notesSlices = createSlice({
  name: "notes",
  initialState,
  reducers: {
    // You can add synchronous actions here if needed
  },
  extraReducers: (builder) => {

    // fechNotes cases
    builder.addCase(fetchNotes.pending, (state) => {
        state.status = "loading";
      })

      builder.addCase(fetchNotes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.notes = action.payload;
      })
      builder.addCase(fetchNotes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })


    //   addNote cases
      builder.addCase(addNote.pending, (state) => {
        state.status = "loading";
      })

      builder.addCase(addNote.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      builder.addCase(addNote.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.notes.push(action.payload);
      });

      // deleteNote cases
      builder.addCase(deleteNote.pending, (state) => {
        state.status = "loading";
      });

      builder.addCase(deleteNote.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

      builder.addCase(deleteNote.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.notes = state.notes.filter((note) => note.id !== action.payload);
      });
  },
});


export default notesSlices.reducer;
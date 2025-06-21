// Create notes///
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { notesUrl } from "../notesUrl";
import axios from 'axios';



// step A : set up initial state
const initialState = {
  notes: [],
  loading: false,
  error: null,
};
// step 1 : setup slice , while using createSlice
const slice = createSlice({
  name: 'notes',
    initialState,
    extraReducers: (builder) => {
      builder
        .addCase(fetchNotes.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchNotes.fulfilled, (state, action) => {
          state.status = 'succeeded';
          // Add any fetched notes to the array
            state.notes = action.payload;
        })
        .addCase(fetchNotes.rejected, (state, action) => {
          state.status;
          state.error = action.error.message;
        });
       
  },
});

//addnote 
extraReducers: (builder) => {
  builder
    .addCase(createNote.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(createNote.fulfilled, (state, action) => {
      state.status = 'succeeded';
        // Add the new note to the array
      state.notes.push(action.payload);
    })
    .addCase(createNote.rejected, (state, action) => {
      state.status;
      state.error = action.error.message;
    });
}

// step 2 : create async thunk for the API
const notesSlice= "http://localhost:3001/api";

//fetchnotes
export const fetchNotes = createAsyncThunk('notes/fetchNotes', async () => {
  const response = await axios.get(`${notesSlice}/notes`);
  console.log("NOTES notesSlice", response.data);
  return response.data;
});
//addnote
export const createNote = createAsyncThunk('notes/createNote', async (noteData) => {
  const response = await axios.post(notesUrl, noteData);
  return response.data;
});

//updateNotes
export const deleteNote = createAsyncThunk('notes/deleteNote', async (id) => {
  await axios.delete('${notesUrl}/${noteId}');
  return noteId; // Return the id to remove it from the state
});

// step 3 : export slice/reducer
export default slice.reducer;
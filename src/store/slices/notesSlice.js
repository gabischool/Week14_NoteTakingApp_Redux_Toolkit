import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { notesUrl } from "../notesUrl";
import axios from "axios";




// step A: setup initial state
const initialState = {
  notes: [],
  status: 'idle', //  loading, succeeded, failed
  error: null
};
// STEP 1: Setup slice , while using createSlice
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
            state.status = 'failed';
            state.error = action.error.message;
            });
    }
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
                    state.status = 'failed';
                    state.error = action.error.message;
                });
              }
          


// step 2: setup async function to use for the API 
const notesSlice = "http://localhost:3001/api"; 



//fetchNotes 
export const fetchNotes = createAsyncThunk('notes/fetchNotes', async () => {
  const response = await axios.get(`${notesSlice}/notes`);
  console.log(" NOTES notesSlice",response.data);
    return response.data;
});

// addnote
export const createNote = createAsyncThunk('notes/createNote', async (notes) => {
  const response = await axios.post(`${notesUrl}/notes`, notes);
  return response.data;
});



// updateNote
export const deleteNote = createAsyncThunk('notes/deleteNote', async (noteId) => {
  await axios.delete(`${notesUrl}/${noteId}`);
  return noteId; // Return the ID to remove it from the state
});



// step3:Export slice/reducer 
export default slice.reducer;


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  notes: [],
  loading: false,
  error: null,
};

export const fetchNotes = createAsyncThunk(
  'notes/fetchNotes',
  async () => {
    const response = await axios.get('http://localhost:3001/api/notes');
    return response.data;
  }
);



export const addNote = createAsyncThunk(
  'notes/addNote',
  async (noteData) => {
    const response = await axios.post('http://localhost:3001/api/notes', noteData);
    return response.data;
  }
);


const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
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
      });   
    },
});

export default notesSlice.reducer;

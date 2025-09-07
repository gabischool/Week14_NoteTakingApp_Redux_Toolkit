import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Base_url } from "../Base-url"
import axios from "axios";

// Async thunk for creating a note
export const fetchsend = createAsyncThunk(
  "notes/create",
  async (noteData) => {
    const response = await axios.post(`${Base_url}/notes`, noteData);
    return response.data;
  }
);

// Async thunk for fetching notes
export const fetchNotes = createAsyncThunk(
  "notes/fetchAll",
  async () => {
    const response = await axios.get(`${Base_url}/notes`);
    return response.data;
  }
);

// Async thunk for deleting a note
export const deleteNote = createAsyncThunk(
  "notes/delete",
  async (id) => {
    await axios.delete(`${Base_url}/notes/${id}`);
    return id;
  }
);

// Async thunk for updating a note
export const updateNote = createAsyncThunk(
  "notes/update",
  async ({ id, noteData }) => {
    const response = await axios.put(`${Base_url}/notes/${id}`, noteData);
    return response.data; // updated note
  }
);

const initialState = {
  notes: [],
  status: "idle",
  error: null,
};

const CreateNoteFormSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchsend.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchsend.fulfilled, (state, action) => {
        state.status = "success";
        state.notes.push(action.payload);
        state.error = null;
      })
      .addCase(fetchsend.rejected, (state, action) => {
        state.status = "fail";
        state.error = action.error.message;
      })
      .addCase(fetchNotes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.status = "success";
        state.notes = action.payload;
        state.error = null;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.status = "fail";
        state.error = action.error.message;
      })
      .addCase(deleteNote.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.status = "success";
        state.notes = state.notes.filter(note => note.id !== action.payload);
        state.error = null;
      })
      .addCase(deleteNote.rejected, (state, action) => {
        state.status = "fail";
        state.error = action.error.message;
      })
      .addCase(updateNote.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        state.status = "success";
        const updated = action.payload;
        const index = state.notes.findIndex(n => n.id === updated.id);
        if (index !== -1) {
          state.notes[index] = updated;
        }
        state.error = null;
      })
      .addCase(updateNote.rejected, (state, action) => {
        state.status = "fail";
        state.error = action.error.message;
      });
  },
});

export default CreateNoteFormSlice.reducer;
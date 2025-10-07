import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../BaseUrl";
import axios from "axios";

export const fetchNotes = createAsyncThunk("notes/fetchNotes", async () => {
  const response = await axios.get(`${BASE_URL}/notes`);
  return response.data;
});

export const addNote = createAsyncThunk("notes/addNote", async (noteData) => {
  const response = await axios.post(`${BASE_URL}/notes`, noteData, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
});

export const updateNote = createAsyncThunk(
  "notes/updateNote",
  async ({ id, updatedData }) => {
    const response = await axios.put(`${BASE_URL}/notes/${id}`, updatedData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  }
);

export const deleteNote = createAsyncThunk("notes/deleteNote", async (id) => {
  await axios.delete(`${BASE_URL}/notes/${id}`);
  return id;
});

const initialState = {
  notes: [],
  status: "idle",
  error: null,
};

const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.status = "success";
        state.notes = action.payload;
        state.error = null;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNote.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addNote.fulfilled, (state, action) => {
        state.status = "success";
        state.notes.push(action.payload);
        state.error = null;
      })
      .addCase(addNote.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateNote.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        state.status = "success";
        const index = state.notes.findIndex(
          (note) => note.id === action.payload.id
        );
        if (index !== -1) {
          state.notes[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateNote.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteNote.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.status = "success";
        state.notes = state.notes.filter((note) => note.id !== action.payload);
        state.error = null;
      })
      .addCase(deleteNote.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default noteSlice.reducer;

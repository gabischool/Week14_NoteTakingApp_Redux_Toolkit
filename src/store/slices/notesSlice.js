import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Import } from "lucide-react";
import axios from "axios";
import { date } from "zod";

// import { build } from "vite";

//API CALL use creatAsyn thunk

export const fetchNotes = createAsyncThunk("notes/fetchNotes", async () => {
  const response = await axios.get(`${BASE_URL}/notes`);
  return response.data;
});

//Add Noteslice
export const addNotes = createAsyncThunk("notes/addNotes", async (noteData) => {
  try {
    const response = await axios.post(`${BASE_URL}/notes`, noteData, {
      headers: {
        "content-type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("server error response:", error.response.data);
    throw error;
  }
});
//Delete Note
export const DeleteNote = createAsyncThunk("Notes/DeleteNote", async (id) => {
  try {
    await axios.delete(`${BASE_URL}/notes/${id}`);
    return id;
    console.log("id", id);
  } catch (error) {
    console.log(error);
  }
});
//Update Note
export const UpdateNote = createAsyncThunk(
  "Notes/UpdateNote",
  async ({ id, updatedData }) => {
    try {
      const response = await axios.put(`${BASE_URL}/notes/${id}`, updatedData);
      return response.data;
    } catch (error) {
      console.error("Error updating note:", error);
      throw error;
    }
  }
);

const initialState = {
  notes: [],
  status: "idle", //loaping ,success,failed.
  error: null,
};

const noteslice = createSlice({
  name: "note",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.status = "loading";
      })

      .addCase(fetchNotes.fulfilled, (state, action) => {
        //now everything is fetched, the server is ok
        state.status = "succeeded";
        (state.notes = action.payload), (state.error = null);
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNotes.fulfilled, (state, action) => {
        state.notes.push(action.payload);
        state.error = null;
      })
      .addCase(addNotes.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(DeleteNote.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.notes = state.notes.filter((Note) => Note.id !== action.payload);
        state.error = null;
      })
      .addCase(DeleteNote.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(UpdateNote.fulfilled, (state, action) => {
        const { id, updatedData } = action.payload;
        const existingNote = state.notes.find((note) => note.id === id);
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(UpdateNote.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default noteslice.reducer;

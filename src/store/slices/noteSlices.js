import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Base_Url } from "../Base_Url";

export const addNotes = createAsyncThunk(
    "notes/addNotes",
    async(noteData) => {
        const response = await axios.post(Base_Url, noteData );
        return response.data;
    }
)
export const fetchNotes = createAsyncThunk(
    "notes/fechNotes",
    async() => {
        const response = await axios.get(Base_Url);
        return response.data;
    }
)

const initialState = {
    notes: [],
    status: "empty",
    error: null
}

const noteSlices = createSlice(
    { name: "notes",
    initialState,
    extraReducers : (builder) => {
        builder.addCase(fetchNotes.pending, (state) => {
            state.status = "loading"
        }

        )
         builder.addCase(fetchNotes.fulfilled, (state , action) => {
            state.status = "success",
            state.notes = action.payload,
            state.error = null
        }

        )
         builder.addCase(fetchNotes.rejected, (state , action) => {
            state.status = "failed",
        
            state.error = action.error.message
        }

        )

          builder.addCase(addNotes.pending, (state) => {
            state.status = "loading"
        }

        )
         builder.addCase(addNotes.fulfilled, (state , action) => {
            state.status = "success",
            state.notes.push(action.payload),
            state.error = null
        }

        )
         builder.addCase(addNotes.rejected, (state , action) => {
            state.status = "failed",
        
            state.error = action.error.message
        }

        )
    }

    }
)
export default noteSlices.reducer;
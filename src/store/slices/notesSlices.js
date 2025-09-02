// step 1: import
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../BASE_Url";



// step 2: Create functions to call the api

// fetchNotes (async thunk)
export const fetchNotes = createAsyncThunk(
    "notes/fetchNotes",
    async() => {
        const response = await axios.get(`${BASE_URL}`)  
          return response.data
        
    }
)

 // addNote (async thunk)
 export const addNote = createAsyncThunk(
    "notes/addNote",
    async(noteData) => {
        try {
        const response = await axios.post(`${BASE_URL}`, noteData, {
            headers: {
                "Content-Type": "application/json"
            }
        })
          return response.data;

        } catch (err) {
            console.log(err)
        }
        
    }
 )

  // UpdateNote (async thunk)
  export const UpdateNote = createAsyncThunk(
    "notes/addNote",
    async(id) => {
        try {
        const response = await axios.put(`${BASE_URL}/${id}`, {
            headers: {
                "Content-Type": "application/json"
            }
        })
          return response.data;

        } catch (err) {
            console.log(err)
        }  
    }    
  )


 // DeleteNote (async thunk)

 export const deleteNote = createAsyncThunk(
    "notes/deleteNote",
    async(id) => {
        try {
          const response = await axios.delete(`${BASE_URL}/${id}`)
          return response.data
        } catch (error) {
            console.log("Error deleting note:", error)
        }
    }
 )


// step 3: Setup "CteateSlice" function

// Initial state should include:
const initialState = {
    notes: [],
   loading: false,
    error: null
}

 const notesSlice = createSlice({
    name: "notes",
    initialState,
    extraReducers: (builder) => {
        // fetchNotes 
    builder.addCase(fetchNotes.pending, (state) => {
        state.loading = false
    })
    builder.addCase(fetchNotes.fulfilled, (state, action) => {
        state.status = "success",
        state.notes = action.payload,
        state.error = null
    })
    builder.addCase(fetchNotes.rejected, (state, action) => {
        state.status = "fail",
        state.error = action.error.message
    })
     // addNote
    builder.addCase(addNote.pending, (state) => {
        state.loading = false
    })
    builder.addCase(addNote.fulfilled, (state, action) => {
        state.notes.push(action.payload)
        state.error = null
    })
    builder.addCase(addNote.rejected, (state, action) => {
        state.error = action.error.message
    })
    

    // updateNote
    // builder.addCase(UpdateNote.pending, (state) => {
    //     state.loading = false
    // })
    // builder.addCase(UpdateNote.fulfilled, (state, action) => {
    //     const update = state.notes.find((note) => note.id === action.payload.id)
    //     if (update !== -1) {
    //         state.notes[update] = action.payload
    //     }
    // })
    // builder.addCase(UpdateNote.rejected, (state, action) => {
    //     state.error = action.error.message
    // })

    // deleteNote function
    builder.addCase(deleteNote.pending, (state) => {
        state.loading = false;
    })
    builder.addCase(deleteNote.fulfilled, (state, action) => {
        state.notes.filter((note) => note.id !== action.payload.id)
    })
    builder.addCase(deleteNote.rejected, (state, action) => {
        state.error = action.error.message
    })
   
 }
})

export default notesSlice.reducer;
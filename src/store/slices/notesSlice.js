import{ createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../baseURL";






const initialState={
    notes: [],
    status: "idle",// loading success error ,
    error :null

};
  export const fetchNotes = createAsyncThunk(
     "Note/fetchNotes",
     async()=>{
        const response = await axios.get(`${BASE_URL}/notes`);
        return response.data
    });
    // createAsyncThunk for adding a new note

     export const addNote = createAsyncThunk(
    "Note/addNote",
    async(noteData)=>{
        try{
        const response = await axios.post(`${BASE_URL}/notes`,noteData,{
            headers: {"Content-Type":"application/json"

            }
        })
            return response.data
    } catch(error)
    {
        throw error
    }
    });


    const  noteSlice = createSlice({
    name : "note",
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(fetchNotes.pending,(state)=>{
        state.status="loading"
        })
        builder. addCase(fetchNotes.fulfilled,(state,action)=>{
        state.status="success"
        state.notes=action.payload
        state.error=null

        })

        builder.addCase(fetchNotes.rejected,(state,action)=>{
        state.status="error"
        state.error=action.error.message
        })


        builder.addCase(addNote.pending,(state)=>{
            state.status="loading"

        })
        builder.addCase(addNote.fulfilled,(state,action)=>{
            state.status="success"
            state.notes.push(action.payload)
        })
        builder.addCase(addNote.rejected,(state,action)=>{
            state.status="error"
            state.error=action.error.message
        })
    }
 })
    export default noteSlice.reducer
    
    
    

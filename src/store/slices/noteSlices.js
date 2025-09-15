import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Url_Link } from "../BaseUrl";


// create function call api

export const fetchNotes = createAsyncThunk(
    "notes/fetchNotes",
    async()=> {
       try{
       const res = await axios.get(`${Url_Link}/notes`)
       return res.data;
       }catch(error){
        console.log("FETCH ERROR", error)
        throw error
       }
    }
)


// create function addNote api

export const addNotes = createAsyncThunk(
    "notes/addNotes",
    async(notesData)=> {
       try{
        console.log("notesdata", notesData)
        const res = await axios.post(`${Url_Link}/notes`, notesData, {
            
            headers:{
                "Content-Type": "application/json",
                
            }
           
        })

         return res.data

       }catch(error) {
        console.log("ADD ERROR", error)
        throw error
       }
    }
)


// update api data

export const updateNotes = createAsyncThunk(
    "notes/updateNotes",
    async({id,updateData})=> {
        try{
        const res = await axios.put(`${Url_Link}/notes/${id}`, updateData, {
            headers:{
                "Content-Type": "application/json",

            }
        })

        return res.data
        }catch(error) {
            console.log("UPDATE NOTES ERROR", error)
            throw error
        }
    }
)

export const deleteNotes = createAsyncThunk(
    "notes/deleteNotes",
    async(id) => {
    try{
    const res = await axios.delete(`${Url_Link}/notes/${id}`)
    return id
    }catch(error) {
        console.log("DELETE NOTES ERROR", error)
        throw error
    }
    }
)

// initial state

const initialState = {
    notes: [],
    error: null,
    status:"idle"
}


const noteSlice = createSlice({
    name: "notes",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchNotes.pending, (state)=>{
            state.status = "loading"
        })

        builder.addCase(fetchNotes.fulfilled, (state, action)=> {
         state.status = "success"
         state.error = null;
         state.notes = action.payload
        })

        builder.addCase(fetchNotes.rejected, (state, action) => {
            state.status = "fail"
            state.error = action.error.message

        })

        builder.addCase(addNotes.pending, (state) => {
            state.status = "loading"
        })

        builder.addCase(addNotes.fulfilled, (state, action) => {
            state.status = "success"
            state.notes.push(action.payload)
            state.error = null;
        })

        builder.addCase(addNotes.rejected, (state, action) => {
            state.status = "fail"
            state.error = action.error.message
        })

        builder.addCase(deleteNotes.pending, (state)=> {
            state.status = "loading"
        })

        builder.addCase(deleteNotes.fulfilled, (state, action) => {
            state.status = "success"
            state.notes = state.notes.filter((note) => note.id !== action.payload)
        })

        builder.addCase(deleteNotes.rejected, (state, action ) => {
            state.status = "fail"
            state.error = action.error.message
        })

        // builder.addCase(updateNotes.pending, (state) => {
        // state.status = "loading";
        // });

        // builder.addCase(updateNotes.fulfilled, (state, action) => {
        // state.status = "success";
        // state.notes = state.notes.map((note) =>
        // note.id === action.payload.id ? action.payload : note
        // );
        // });

        // builder.addCase(updateNotes.rejected, (state, action) => {
        // state.status = "fail";
        // state.error = action.error.message;
        // });



        
    }
})

export default noteSlice.reducer





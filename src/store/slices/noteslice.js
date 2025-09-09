import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "./baseurl";
import axios from "axios";


export const fetchnotes=createAsyncThunk(
    "notes/fetchnotes",
    async()=>{
        const response = await axios.get(`${BASE_URL}/notes`)
       return response.data
    
    
    })
    export const deletenotes=createAsyncThunk(
        "notes/deletenotes",
        async(id)=>{
            const response = await axios.delete(`${BASE_URL}/notes/${id}`);
           return id;
        
        
        })

  
    export const addnotes=createAsyncThunk(
        "notes/addnotes",
        async(notesdata)=>{
            try{
                const response=await axios.post(`${BASE_URL}/notes`,notesdata, {
                    headers:{
                        "content-type":"Application/json"
                    }
                })
                return response.data
            }catch (error){
                throw error
            }
        }

    )

const initialState={
    notes:[],
    status:"idle", 
    error:null
} 
const noteslice=createSlice({
    name:"notes",
    initialState,
    extraReducers:(builder)=>{
     builder.addCase(fetchnotes.pending, (state)=>{
        state.status="loading"
     })
     builder.addCase(fetchnotes.fulfilled,(state , action)=>{
        state.status="success",
        state.notes=action.payload,
        state.error=null
     })
   builder.addCase(fetchnotes.rejected,(state,action)=>{
    state.status="fail",
    state.error=action.error.message
   })
   builder.addCase(addnotes.pending, (state)=>{
    state.status="loading"
 })
 builder.addCase(addnotes.fulfilled,(state , action)=>{
    state.status="success",
    state.notes.push(action.payload),
    
    state.error=null
 })
builder.addCase(addnotes.rejected,(state,action)=>{
state.status="fail",
state.error=action.error.message
})
builder.addCase(deletenotes.pending, (state)=>{
    state.status="loading"
 })
 builder.addCase(deletenotes.fulfilled,(state , action)=>{
    state.status="success",
    state.notes.filter(note.id !==action.payload),
    
    state.error=null
 })
builder.addCase(deletenotes.rejected,(state,action)=>{
state.status="fail",
state.error=action.error.message
})
    }
})


export default noteslice.reducer;


//step one
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { base_Url } from "../baseUrl";


//step two

export const fetchnote = createAsyncThunk (
"notes/fetchnote",
  
async () => {
    const response = await axios.get(`${base_Url}/notes`)
    return response.data
}

)


//Add note

export const Addnote = createAsyncThunk (
    "notes/Addnote",

    async(noteData) => {
        // console.log("noteData",noteData)
        const response = await axios.post(`${base_Url}/notes`, noteData, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        // console.log("response",response)
    
        return response.data

        
    } 
 
)

//Delete Note

export const Deletenote = createAsyncThunk(
    "notes/Deletenote",
    
    async(Id) => {
        const response = await axios.delete(`${base_Url}/notes/${Id}`)
        
        // console.log("response", response)
           return Id;
    }

 


)

// update note

export const updatenote = createAsyncThunk(
    "notes/updatenote",

    async({id, notes}) => {
        const response = await axios.put(`${base_Url}/notes/${id}`, notes, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        // console.log("response",response)
    
        return id;

        
    } 
 
)
    


//step three

const initialState =  {
    notes: [],
    status: "idle",
    error: null

}

const noteSlice = createSlice({
    name: "notes",
    initialState,
    extraReducers: (builder) => {
        builder
        .addCase(fetchnote.pending, (state) => {
            state.status = "loading"

        })
        .addCase(fetchnote.fulfilled, (state, action) => {
            state.status = "succsess"
            state.notes = action.payload
            state.error = null
        })
        .addCase(fetchnote.rejected, (state, action) => {
            state.status = "failed",
            state.error = action.error.message
        })
         .addCase(Addnote.fulfilled, (state, action) => {
                    state.notes.push(action.payload)
                    state.error = null;
                })
                .addCase(Addnote.rejected, (state, action) => {
                    state.error = action.error.message;
                })
                
                 .addCase(Deletenote.fulfilled, (state, action) => {
                       state.loading = false;
                 state.notes = state.notes.filter(note => note.id !== action.payload)
              })

             .addCase(Deletenote.rejected, (state, action) => {
             state.loading = false;
             state.error = action.error.message;
         })



 .addCase(updatenote.fulfilled, (state, action) => {
                       state.loading = false;
                 state.notes = state.notes.filter(note => note.id !== action.payload)
              })

             .addCase(updatenote.rejected, (state, action) => {
             state.loading = false;
             state.error = action.error.message;
         })

              


    }

})


//step four

export default noteSlice.reducer
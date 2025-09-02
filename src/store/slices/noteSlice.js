

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { BASE_URL } from "../baseUrl";
import axios from "axios";



export const noteAll = createAsyncThunk( 
    "notes/noteAll",
    async() => {
        const  response = await axios.get(`${BASE_URL}/notes`)
        return response.data
    }
    )

    // Add notes from 

    export const AddNotes = createAsyncThunk(
        "notes/AddNotes",

        async(addData) => {
            try{
                const  response =  await axios.post(`${BASE_URL}/notes`, addData,{
                    header : {
                        "Content-Type":'application/json'
                    }
                })
                return response.data

            }catch(error) {
                throw error
            }
        
        }

    )
 

    // Delete

    export const deleteNotes = createAsyncThunk(
  "notes/deleteNotes",
  async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/notes/${id}`, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      return id;
    } catch (error) {
      throw error;
    }
  }
);




export const noteUpdate = createAsyncThunk(
  "notes/noteUpdate",
  async ({ id, title, content }) => {
    const response = await axios.put(
      `${BASE_URL}/notes/${id}`,
      { title, content },
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  }
);







const initialState = {
    notes: [],
    status: "idle",
    error: null
}

const NoticeSlice = createSlice({
    name: "notes",
    initialState,
    extraReducers: (builder) => {
        //  seddex marxalood mari pending sucess fail 

        builder.addCase(noteAll.pending, (state) => {
            state.status = "loading"
        })

       builder.addCase(noteAll.fulfilled, (state, action) => {
        state.status = "success",
        state.notes = action.payload,
        state.error = null
       }) 

      builder.addCase(noteAll.rejected, (state, action ) => {
        state.status = "fail",
        state.error = action.error.message
      }) 

    //   addNotes 
    builder.addCase( AddNotes.pending, (state) => {
        state.status = 'loading'
    })
    builder.addCase(AddNotes.fulfilled, (state, action ) =>{
        state.notes.push(action.payload),
        state.error = null
    })

    builder.addCase(AddNotes.rejected, (state, action) => {
        state.error = action.error.message
    })


    //  delete 

    builder.addCase(deleteNotes.pending, (state) => {
        state.status = 'loading'
    })
  
  
    builder.addCase(deleteNotes.fulfilled, (state, action) => {
      state.notes = state.notes.filter(note => note.id !== action.payload);
      state.error = null;
      state.status = "success";
    })

    builder.addCase(deleteNotes.rejected, (state, action) => {
        state.error = action.error.message
    })


    builder.addCase(noteUpdate.pending, ( state ) => {
      state.status = "loading"
    })



builder.addCase(noteUpdate.fulfilled, (state, action) => {
  const updated = action.payload;
  state.notes = state.notes.map(note =>
    note.id === updated.id ? updated : note
  );
  state.status = "success";
  state.error = null;
});



    builder.addCase(noteUpdate.rejected, (state, action) => {
      state.error = action.error.message
    })



    }
})





export default NoticeSlice.reducer;







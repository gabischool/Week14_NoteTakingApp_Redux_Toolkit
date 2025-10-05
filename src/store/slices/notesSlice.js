import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export const fetchNotes = createAsyncThunk(
    "addNotes/fetchNotes",
    async() => {
        const response = await axios.get(`${BASE_URL}/Notes`)
        return response.data
    }
)


export const addNotes = createAsyncThunk(
    "Notes/addNotes",
    async(noteData) => {
        try {

            const response = await axios.post(`${BASE_URL}/Notes`, noteData, {
                headers: {
                    "Content-Type": "application/json"
                }
            })

            return response.data

        } catch(error) {
            throw error
        }
    }
)

const initialState = {
    notes: [],
    loading: false,
    error: null,
  };


  const  notesSlice = createSlice({
    name: "notes",
    initialState,
    extraReducers: (builder) => {
        // add cases
        builder
           .addCase(fetchNotes.pending, (state) => {
            state.loading = "loading"
           })
           .addCase(fetchNotes.fulfilled, (state, action) => {
              state.loading = "success",
              state.notes = action.payload,
              state.error = null 
           })
           .addCase(fetchNotes.rejected, (state, action) => {
              state.loading = "failed",
              state.error = action.error.message
           })

           // Add volunteer cases

            .addCase(addNotes.pending, (state) => {
            state.loading = "loading"
           })
           .addCase(addNotes.fulfilled, (state, action) => {
              state.loading = "success",
              state.notes.push(action.payload)
              state.error = null 
           })
           .addCase(addNotes.rejected, (state, action) => {
              state.loading = "failed",
              state.error = action.error.message
           })
    }
})

export default notesSlice.reducer;
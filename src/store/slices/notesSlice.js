import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = {
  notes: [],
}

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: {
      reducer(state, action) {
        state.notes.push(action.payload)
      },
      prepare(content) {
        return {
          payload: {
            id: nanoid(),
            content,
            createdAt: new Date().toISOString(),
          },
        }
      },
    },
    removeNote(state, action) {
      state.notes = state.notes.filter(
        (note) => note.id !== action.payload
      )
    },
    updateNote(state, action) {
      const { id, content } = action.payload
      const note = state.notes.find((n) => n.id === id)
      if (note) {
        note.content = content
      }
    },
  },
})

export const { addNote, removeNote, updateNote } = notesSlice.actions
export default notesSlice.reducer


